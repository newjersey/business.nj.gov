import { fireEvent, render, RenderResult } from "@testing-library/react";
import { MiniRoadmap } from "./MiniRoadmap";

import * as useRoadmapModule from "../lib/data/useRoadmap";
import { Roadmap } from "../lib/types/types";
import { generateRoadmap, generateStep, generateTask } from "../test/factories";

jest.mock("../lib/data/useRoadmap", () => ({
  useRoadmap: jest.fn(),
}));
const mockUseRoadmap = (useRoadmapModule as jest.Mocked<typeof useRoadmapModule>).useRoadmap;

describe("<MiniRoadmap />", () => {
  let subject: RenderResult;
  beforeEach(() => {
    useMockRoadmap(
      generateRoadmap({
        steps: [
          generateStep({ name: "step1", tasks: [generateTask({ name: "task1", id: "task1" })] }),
          generateStep({ name: "step2", tasks: [generateTask({ name: "task2", id: "task2" })] }),
        ],
      })
    );

    subject = render(<MiniRoadmap activeTaskId="task2" />);
  });

  it("expands the step that you are in by default", () => {
    expect(subject.queryByText("task2")).toBeInTheDocument();
    expect(subject.queryByText("task1")).not.toBeInTheDocument();
  });

  it("expands another step when clicked, keeping your step open", () => {
    fireEvent.click(subject.getByText("step1"));
    expect(subject.queryByText("task2")).toBeInTheDocument();
    expect(subject.queryByText("task1")).toBeInTheDocument();
  });

  it("closes an open step when clicked", () => {
    fireEvent.click(subject.getByText("step2"));
    expect(subject.queryByText("task2")).not.toBeInTheDocument();
    expect(subject.queryByText("task1")).not.toBeInTheDocument();
  });

  const useMockRoadmap = (roadmap: Partial<Roadmap>): void => {
    mockUseRoadmap.mockReturnValue({ roadmap: generateRoadmap(roadmap) });
  };
});