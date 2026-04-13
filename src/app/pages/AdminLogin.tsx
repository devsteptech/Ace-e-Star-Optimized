import { Component } from "react";
import type { ChangeEvent } from "react";
import { Navigate } from "react-router-dom";
import AdminHeader from "@/component/partial/adminLogin/AdminHeader";
import FeaturesList from "@/component/partial/adminLogin/FeaturesList";
import LoginForm from "@/component/partial/adminLogin/LoginForm";
import AdminFooter from "@/component/partial/adminLogin/AdminFooter";

import { adminLoginApi } from "@/repositories/auth.repo";
import { authStorage } from "@/helper/authStorage";

type State = {
    email: string;
    password: string;
    remember: boolean;
    redirectToDashboard: boolean;
    loading: boolean;
    error: string | null;
};

type TextFieldName = "email" | "password";

export default class AdminLogin extends Component<{}, State> {
    state: State = {
        email: "",
        password: "",
        remember: false,
        redirectToDashboard: false,
        loading: false,
        error: null,
    };

    handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const key = e.target.name as TextFieldName;
        const value = e.target.value;

        this.setState((prev) => ({
            ...prev,
            [key]: value,
            error: null,
        }));
    };

    handleRememberChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ remember: e.target.checked });
    };

    handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const email = this.state.email.trim();
        const password = this.state.password;

        if (!email || !password) {
            this.setState({ error: "Email and password are required." });
            return;
        }

        try {
            this.setState({ loading: true, error: null });

            const data = await adminLoginApi(email, password);

            const token: string | undefined = (data as any)?.token;
            if (!token) {
                this.setState({ loading: false, error: "Token not received from server." });
                return;
            }

            authStorage.setAdminToken(token, this.state.remember ? "local" : "session");
            this.setState({ loading: false, redirectToDashboard: true });
        } catch (err: any) {
            this.setState({
                loading: false,
                error: err?.message || "Network error (backend not reachable)",
            });
        }
    };

    handleBack = () => {
        window.history.back();
    };

    render() {
        const { email, password, remember, redirectToDashboard, loading, error } = this.state;

        if (redirectToDashboard) {
            return <Navigate to="/app/adminDashboard" replace />;
        }

        return (
            <section className="relative bg-[url('/bg-images/WhoYouAre.png')] bg-cover bg-top-right h-screen min-h-screen bg-no-repeat w-full rounded-0 bg-white lg:overflow-x-hidden overflow-scroll">
                <div className="relative z-10 mx-auto max-w-[1280px] w-full h-full px-4 sm:px-6 lg:px-0 py-8 sm:py-16 flex flex-col">
                    <div className="flex-1 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                        <div className="w-full flex flex-col gap-6">
                            <AdminHeader />
                            <FeaturesList />
                        </div>

                        <LoginForm
                            email={email}
                            password={password}
                            remember={remember}
                            loading={loading}
                            error={error}
                            onChange={this.handleInputChange}
                            onRememberChange={this.handleRememberChange}
                            onSubmit={this.handleSubmit}
                        />
                    </div>

                    <AdminFooter onBack={this.handleBack} />
                </div>
            </section>
        );
    }
}