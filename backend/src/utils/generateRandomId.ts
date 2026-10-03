import crypto from "crypto";

function generateRandomId() {
  return crypto.randomUUID();
}

export default generateRandomId;
