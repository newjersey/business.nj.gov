import React, { ReactElement } from "react";
import { Task } from "./Task";
import * as types from "../lib/types/types";
import { VerticalStepIndicator } from "./njwds-extended/VerticalStepIndicator";

interface Props {
  step: types.Step;
  last: boolean;
}

export const Step = (props: Props): ReactElement => {
  return (
    <div className="grid-row margin-top-3">
      <div className="tablet:grid-col-3 margin-right-4">
        <div className="fdr usa-prose">
          <VerticalStepIndicator number={props.step.step_number} last={props.last} />
          <div className="step-label">
            <h2 className="margin-0 text-reg line-height-body-5">{props.step.name}</h2>
            <div className="text-sm text-base-dark">{props.step.timeEstimate}</div>
          </div>
        </div>
      </div>

      <div className="tablet:grid-col-8 roadmap-content">
        <p>{props.step.description}</p>
        <ul>
          {props.step.tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </ul>
      </div>
    </div>
  );
};