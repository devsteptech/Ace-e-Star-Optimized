import { Component } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Navigate } from "react-router-dom";

import { eventmanLoginApi } from "@/repositories/auth.repo";
import { authStorage } from "@/helper/authStorage";
import { GradianButton } from "@/component/sharing/GradianButton";

type State = {
    username: string;
    password: string;
    url: string;
    redirectToDashboard: boolean;
    error: string | null;
    loading: boolean;
};

type TextFieldName = "username" | "password" | "url";

export default class UserLogin extends Component<{}, State> {
    state: State = {
        username: "",
        password: "",
        url: "",
        redirectToDashboard: false,
        error: null,
        loading: false,
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

    handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const email = this.state.username.trim();
        const password = this.state.password;

        if (!email || !password) {
            this.setState({ error: "Email and password are required." });
            return;
        }

        try {
            this.setState({ loading: true, error: null });

            const data = await eventmanLoginApi(email, password);

            const token: string | undefined = (data as any)?.token;
            if (!token) {
                this.setState({ loading: false, error: "Token not received from server." });
                return;
            }

            // tumhara old behavior: sessionStorage
            authStorage.setUserToken(token, "session");

            this.setState({
                loading: false,
                username: "",
                password: "",
                url: "",
                redirectToDashboard: true,
                error: null,
            });
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
        const { username, password, redirectToDashboard, error, loading } = this.state;

        if (redirectToDashboard) {
            return <Navigate to="/app/userdashboard" replace />;
        }

        return (
            <section className="relative bg-[url('/bg-images/WhoYouAre.png')] bg-cover bg-top-right h-screen min-h-screen bg-no-repeat w-full rounded-0 bg-white lg:overflow-y-scroll lg:overflow-x-hidden overflow-scroll">
                <div className="relative z-10 mx-auto max-w-[1280px] w-full h-full px-4 sm:px-6 lg:px-10 py-8 sm:py-16 flex flex-col">
                    <div className="flex-1 w-full flex items-center justify-center">
                        <div className="w-full max-w-[1180px] bg-white/95 border border-[#eeeeee] rounded-[36px] shadow-[0_35px_90px_rgba(0,0,0,0.18)] px-6 sm:px-16 py-10 sm:py-14">
                            <h2 className="text-center text-[22px] sm:text-[30px] font-bold text-[#4b4b4b]">
                                Welcome to{" "}
                                <span className="text-[#E08213]">Ace E Star</span> User Login
                            </h2>

                            <div className="mt-10 sm:mt-14 w-full flex justify-center">
                                <form className="w-full max-w-[620px] space-y-6" onSubmit={this.handleSubmit}>
                                    <div className="text-[18px] font-semibold text-[#374151]">
                                        User Login
                                    </div>

                                    <input
                                        type="text"
                                        name="username"
                                        value={username}
                                        onChange={this.handleInputChange}
                                        placeholder="Enter Email"
                                        className="w-full h-16 lg:h-12 2xl:h-16 rounded-xl border text-black border-[#e5e7eb] bg-white px-5 text-[16px] outline-none focus:border-[#FCC125]"
                                    />

                                    <input
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={this.handleInputChange}
                                        placeholder="••••••••"
                                        className="w-full h-16 lg:h-12 2xl:h-16 rounded-xl border text-black border-[#e5e7eb] bg-white px-5 text-[16px] outline-none focus:border-[#FCC125]"
                                    />

                                    {error && (
                                        <div className="text-red-600 text-sm font-medium">
                                            {error}
                                        </div>
                                    )}

                                    <div className="text-center font-bold text-[#FCC125] py-1">
                                        OR
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`cursor-pointer w-full h-16 rounded-full text-white font-semibold text-[18px] mt-8 sm:mt-10 disabled:opacity-60 ${GradianButton}`}
                                    >
                                        {loading ? "Signing In..." : "Sign In"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 w-full flex flex-col sm:flex-row 2xl:pb-0 lg:pb-8 pb-8 sm:pb-16 items-center justify-between gap-6">
                        <button
                            type="button"
                            onClick={this.handleBack}
                            className="cursor-pointer w-[180px] h-14 border border-[#bdbdbd] bg-[#ededed] text-[#4b4b4b] font-semibold"
                        >
                            Back
                        </button>

                        <div className="flex flex-wrap justify-center gap-6 sm:gap-10 text-[14px] sm:text-[17px] font-medium text-[#2f2f2f]">
                            <a href="#">Privacy Policy</a>
                            <a href="#">Support</a>
                            <a href="#">Terms And Condition</a>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}