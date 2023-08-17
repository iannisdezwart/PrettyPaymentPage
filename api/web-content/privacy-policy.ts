import { RequestHandler } from "express";
import { getPgClient } from "../pg-config";

export const privacyPolicyEndpoint: RequestHandler = async (req, res) => {
  const langCode = req.query.langCode as string;

  const { rows } = await getPgClient().query(
    "SELECT * FROM blindenbieb_privacy_policy WHERE lang = $1",
    [langCode]
  );
  const value = rows[0]?.value;

  if (value == null) {
    res.status(404).send("Not found");
    return;
  }

  res.status(200).send(rows[0].value);
};
