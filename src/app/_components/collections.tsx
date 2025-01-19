import React from "react";

interface CollectionsProps extends React.ComponentProps<"section"> {
  someProps?: string
}

export default function Collections({ ...props }: CollectionsProps) {
  return (
    <section
      {...props}
      className="flex h-screen w-full justify-center"
    >
      <div className="container border-x"></div>
    </section>
  );
}
