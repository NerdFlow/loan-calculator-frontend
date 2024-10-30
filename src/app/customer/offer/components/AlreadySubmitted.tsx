import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

function AlreadySubmitted() {
  return (
    <div className="h-screen flex items-center justify-center flex-col gap-4">
      <FontAwesomeIcon
        icon={faCheckCircle}
        className="text-green-500"
        size="4x"
      />
      <p className="text-lg">
        Thank you for selecting your Package. If you require a fresh link,
        please contact us at CreativeCapitalSolutions
      </p>
    </div>
  );
}

export default AlreadySubmitted;
