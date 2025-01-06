import React, { SetStateAction } from "react";

export interface RegisterVerifyType {
    setRegistirationCode: React.Dispatch<SetStateAction<null | string>>
}