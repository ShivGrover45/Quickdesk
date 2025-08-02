import { Navigate } from "react-router-dom";

const Index = () => {
  // Redirect to dashboard - this component should not be reached due to routing
  return <Navigate to="/dashboard" replace />;
};

export default Index;
