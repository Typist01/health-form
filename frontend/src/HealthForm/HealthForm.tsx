import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FC, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ChronicIllnessForm from "./ChronicIllnessForm";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Loader from "./Loader";
import SuccessScreen from "./SuccessScreen";

interface HealthFormProps {}

export type FormTypes = {
  name: string;
  age: string;
  gender: string;
  healthCondition: string;
  symptomsExperienced: boolean;
  symptoms: string;
};
export const inputClass = " ml-5 mt-2 ";
export const labelClass =
  "justify-between text-left w-full leading-6 items-center";

const HealthForm: FC<HealthFormProps> = () => {
  const methods = useForm<FormTypes>();
  const [state, setState] = useState<"idle" | "submitting" | "success">(
    "submitting"
  );

  const onSubmit = async (data: FormTypes) => {
    try {
      setState("submitting");
      const resp = await fetch("http://localhost:8080/questionnaires", {
        method: "POST",
        body: JSON.stringify({ ...data, age: parseInt(data.age) }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (resp.status === 204) {
        toast.success("Form submitted!");
        setState("success");
      } else {
        toast.info("Please try again!");
        setState("idle");
      }
    } catch (e) {
      console.error(e);
      setState("idle");
    }
  };

  const {
    setValue,
    register,
    formState: { errors },
  } = methods;

  return (
    <div className="rounded rounded-3xl bg-gradient-to-r from-pink-200 via-pink-100 to-indigo-100 py-20 px-20 mt-[10vh] flex flex-col lg:flex-row">
      <h1 className="text-2xl mb-10 w-1/2 text-left">Health Form</h1>
      <FormProvider {...methods}>
        <form
          className="min-h-[20rem]"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          {state === "submitting" && (
            <div className=" pt-20">
              <Loader />
              <p className="font-semibold mt-3">Submitting form</p>
            </div>
          )}
          {state === "idle" && (
            <div className="max-w-xl mx-auto space-y-8">
              <Label
                data-testid="name-label"
                errMsg={errors.name && "required"}
                htmlFor="name"
                className={labelClass}
              >
                <span className="min-w-[4rem]">Name*</span>
                <Input
                  data-testid="name-input"
                  {...register("name", { required: true })}
                  className={inputClass}
                />
              </Label>

              <Label
                data-testid="age-label"
                errMsg={
                  errors.age &&
                  (errors.age.type === "required"
                    ? "required"
                    : "must be a number")
                }
                className={labelClass}
              >
                <span className="min-w-[4rem]">Age*</span>
                <Input
                  data-testid="age-input"
                  {...register("age", {
                    required: true,
                    pattern: /^[0-9]\d*$/,
                  })}
                  className={inputClass}
                />
              </Label>

              <Label className={labelClass} data-testid="gender-label">
                <span className="min-w-[4rem]">Gender *</span>
                <div className={inputClass} data-testid="gender-select">
                  <Select
                    defaultValue=""
                    required
                    data-testid="gender-select-internal"
                    onValueChange={(val: string) => setValue("gender", val)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select one" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Not_specified">
                        Not Specified
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </Label>

              <Label
                className={labelClass}
                data-testid="health-condition-label"
              >
                <span className="min-w-[4rem]">Health Condition</span>
                <div
                  className={inputClass}
                  data-testid="health-condition-select"
                >
                  <Select
                    onValueChange={(val: string) =>
                      setValue("healthCondition", val)
                    }
                  >
                    <SelectTrigger
                      data-testid="health-condition-select-internal"
                      className="w-[180px]"
                    >
                      <SelectValue placeholder="Select one" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Healthy">Healthy</SelectItem>
                      <SelectItem value="Minor_illness">
                        Minor Illness
                      </SelectItem>
                      <SelectItem
                        value="Chronic_illness"
                        data-testid="chronic-illness"
                      >
                        <span data-testid="chronic-illness">
                          Chronic Illness
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </Label>

              <ChronicIllnessForm />

              <div className="h-40">
                <Button className="mt-10" type="submit">
                  Submit
                </Button>
              </div>
            </div>
          )}
          {state === "success" && <SuccessScreen />}
        </form>
      </FormProvider>
    </div>
  );
};

export default HealthForm;
