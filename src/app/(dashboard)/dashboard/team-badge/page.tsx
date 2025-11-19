import React from "react";
import { PageHeader } from "../../_components/PageHeader";
import LevelsBadge from "./components/levels-badge";

const page = () => {
  return (
    <div>
      <PageHeader
        title="Team & Badge Approvals"
        subtitle="Review and approve user achievement badges."
      />

      <div className="p-6 mt-6">
        <LevelsBadge />
      </div>
    </div>
  );
};

export default page;
