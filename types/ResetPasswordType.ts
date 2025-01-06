import React, { SetStateAction } from "react";

export interface ResetPasswordType {
    setResetPasswordCode: React.Dispatch<SetStateAction<null | string>>
}