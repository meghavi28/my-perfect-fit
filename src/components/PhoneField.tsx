import * as React from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { cn } from "@/lib/utils";
import "react-phone-number-input/style.css";

type Props = {
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  onBlur?: () => void;
  name?: string;
  id?: string;
  error?: string;
};

export function PhoneField({
  value,
  onChange,
  onBlur,
  name,
  id,
  error,
}: Props) {
  return (
    <div className="space-y-2">
      <div className={cn("PhoneInput", error ? "border-red-500" : "")}>
        <PhoneInput
          international
          defaultCountry="IN"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          numberInputProps={{
            id,
            name,
            className: "PhoneInputInput",
            placeholder: "Enter phone number",
          }}
          countrySelectProps={{
            className: "PhoneInputCountrySelect",
          }}
        />
      </div>
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}

export { isValidPhoneNumber };
