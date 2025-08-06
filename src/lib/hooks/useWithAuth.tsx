import { useEffect } from "react";
import useAuth from "@/lib/stores/useAuthStores";
import { useRouter } from "next/navigation";

// Higher Order Component for route protection
const withAuth = (Component: any, allowedRoles: string[] = []) => {
  return function AuthWrapped(props: any) {
    const { user, isAuthenticated } = useAuth();
    const router = useRouter();
    useEffect(() => {
      if (
        allowedRoles.length > 0 &&
        user &&
        !allowedRoles.includes(user.role || "")
      ) {
        router.push("/");
      }
    }, [isAuthenticated, user, router]);

    if (!user || !isAuthenticated) {
      return (
        <div className="container h-screen mx-auto px-4 py-16 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-4 text-gray-600">Đang kiểm tra xác thực...</span>
        </div>
      );
    }

    if (
      allowedRoles.length > 0 &&
      user &&
      !allowedRoles.includes(user.role || "")
    ) {
      return (
        <div className="container h-screen mx-auto px-4 py-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Không có quyền truy cập
            </h1>
            <p className="text-gray-600">
              Bạn không có quyền truy cập vào trang này.
            </p>
          </div>
        </div>
      );
    }

    return <Component {...props} />;
  };
};

/**
 * Hook to protect routes that require authentication
 * Redirects to login page if user is not authenticated
 */
export function useRequireAuth(redirectTo: string = "/auth") {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, router, redirectTo]);

  return isAuthenticated;
}

/**
 * Hook to redirect authenticated users away from auth pages
 * Useful for login/register pages
 */
export function useRedirectIfAuthenticated(redirectTo: string = "/") {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, router, redirectTo]);

  return !isAuthenticated;
}

/**
 * Hook to get authentication status and user info
 */
export function useAuthStatus() {
  const { user, isAuthenticated, token } = useAuth();

  return {
    user,
    isAuthenticated,
    token,
    isLoading: false, // You can add loading state if needed
  };
}

export default withAuth;
