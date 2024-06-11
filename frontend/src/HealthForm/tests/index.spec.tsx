import "@testing-library/jest-dom";
import { cleanup, render, screen } from "@testing-library/react";
import HealthForm, { FormTypes } from "../HealthForm";
import ChronicIllnessForm from "../ChronicIllnessForm";
import { FormProvider, useForm } from "react-hook-form";
import { ReactNode } from "react";

afterEach(cleanup);

const Wrapper = ({
  children,
  defaultValues,
}: {
  children: ReactNode;
  defaultValues: FormTypes;
}) => {
  const methods = useForm<FormTypes>({ defaultValues });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("HealthForm", () => {
  test("should render the initial form fields", async () => {
    render(<HealthForm />);
    expect(screen.getByTestId("name-label")).toBeInTheDocument();
    expect(screen.getByTestId("age-label")).toBeInTheDocument();
    expect(screen.getByTestId("gender-label")).toBeInTheDocument();
    expect(screen.getByTestId("health-condition-label")).toBeInTheDocument();
  });
  test("and should render symptoms-experienced fields when Critical Illness is selected", async () => {
    render(
      <Wrapper
        defaultValues={{
          name: "Mustafa",
          age: "25",
          gender: "Male",
          healthCondition: "Chronic_illness",
          symptomsExperienced: false,
          symptoms: "",
        }}
      >
        <ChronicIllnessForm />
      </Wrapper>
    );

    expect(
      screen.getByTestId("symptoms-experienced-label")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Have you experienced any symptoms in the last 14 days?")
    ).toBeInTheDocument();
  });

  test("and should render symptoms fields when symptomsExperienced is true", async () => {
    render(
      <Wrapper
        defaultValues={{
          name: "Mustafa",
          age: "25",
          gender: "Male",
          healthCondition: "Chronic_illness",
          symptomsExperienced: true,
          symptoms: "",
        }}
      >
        <ChronicIllnessForm />
      </Wrapper>
    );

    expect(screen.getByTestId("symptoms-label")).toBeInTheDocument();
    expect(
      screen.getByText("If yes, list the symptoms experienced (if applicable)")
    ).toBeInTheDocument();
  });
});
