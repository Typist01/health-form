import { Label } from "@/components/ui/label";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { FormTypes, inputClass, labelClass } from "./HealthForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface ChronicIllnessFormProps {}

const ChronicIllnessForm: FC<ChronicIllnessFormProps> = () => {
  const { watch, setValue, register } = useFormContext<FormTypes>();
  const healthCondition = watch("healthCondition");
  const symptomsExperienced = watch("symptomsExperienced");

  if (healthCondition !== "Chronic_illness") {
    return null;
  }

  return (
    <>
      <Label className={labelClass} data-testid="symptoms-experienced-label">
        Have you experienced any symptoms in the last 14 days?
        <div className={inputClass} data-testid="symptoms-experienced-select">
          <Select
            data-testid="symptoms-experienced-select-internal"
            onValueChange={(val: string) =>
              setValue("symptomsExperienced", val === "yes")
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Yes/No" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Label>
      {symptomsExperienced && (
        <Label className={labelClass} data-testid="symptoms-label">
          If yes, list the symptoms experienced (if applicable)
          <Textarea
            data-testid="symptoms-input"
            className={inputClass}
            {...register("symptoms")}
          />
        </Label>
      )}
    </>
  );
};

export default ChronicIllnessForm;
