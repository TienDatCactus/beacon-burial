const withAuth = (Component: any, allowedRoles: string[] = []) => {
  return function AuthWrapped(props: any) {
    // const { user } = useAuth();
    console.log(allowedRoles);

    // useEffect(() => {
    //   if (!user) {
    //     window.location.href = "/auth";
    //   } else if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    //     window.location.href = "/403";
    //   }
    // }, [user]);

    // if (!user)
    //   return (
    //     <div className="container h-screen mx-auto px-4 py-16 flex items-center justify-center">
    //       <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    //       <span className="ml-4 text-gray-600">Đang tải...</span>
    //     </div>
    //   );

    return <Component {...props} />;
  };
};

export default withAuth;
