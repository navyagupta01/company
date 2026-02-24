import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ReactNode } from "react";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-4">
                <Loader2 className="h-10 w-10 text-primary animate-spin" />
                <p className="text-muted-foreground animate-pulse font-medium">Authenticating...</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
