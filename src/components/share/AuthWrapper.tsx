import React from "react";

const AuthWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div>{children}</div>;
};

export default AuthWrapper;
