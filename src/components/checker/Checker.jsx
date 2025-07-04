import React from "react";

export default function Checker({ status, palette, updateNewStatus }) {
  async function toggleStatus() {
    const oldStatus=status;
    status=status==="completed"?"pending":"completed"
    updateNewStatus(oldStatus,status);
  }
  return (
    <button
      type="button"
      style={{ background: status==="completed" ? palette : "gray" }}
      onClick={toggleStatus}
      className={`w-7 h-7 rounded-sm transition-colors duration-200 ${
        status==="completed" ? '' : "opacity-40 bg-gray-400"
      }`}
    ></button>
  );
}
