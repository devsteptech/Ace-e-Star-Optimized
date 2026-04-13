import FeatureCard from "./FeatureCard";

export default function FeaturesList() {
    return (
        <div className="space-y-4">
            <FeatureCard
                iconSrc="/images/adminloginuser.svg"
                iconAlt="Guest Management"
                title="Guest Management"
                description="Streamline check-ins and track attendance in real-time"
            />

            <FeatureCard
                iconSrc="/images/adminloginbadge.svg"
                iconAlt="Badge Printing"
                title="Badge Printing"
                description="Create and print professional name tags instantly"
            />

            <FeatureCard
                iconSrc="/images/adminloginevent.svg"
                iconAlt="Event Analytics"
                title="Event Analytics"
                description="Comprehensive reports and attendance insights"
            />
        </div>
    );
}