import React, { useState } from "react";

let classnames = require("classnames");

const Button = ({ label, scope, setScope }) => {
  return (
    <button
      className={classnames(
        "rounded-sm hover:underline py-1 px-2",
        scope === label && "bg-skin-secondary text-skin-strong"
      )}
      onClick={() => {
        setScope(label);
      }}
    >
      {label}
    </button>
  );
};
const ScopeButtonsGroup = () => {
  const [scope, setScope] = useState("5D");
  return (
    <div className="flex items-center justify-center gap-1">
      Scope
      <Button label="5D" scope={scope} setScope={setScope} />
      <Button label="1M" scope={scope} setScope={setScope} />
      <Button label="6M" scope={scope} setScope={setScope} />
      <Button label="YTD" scope={scope} setScope={setScope} />
      <Button label="1Y" scope={scope} setScope={setScope} />
      <Button label="ALL" scope={scope} setScope={setScope} />
    </div>
  );
};

export default ScopeButtonsGroup;
