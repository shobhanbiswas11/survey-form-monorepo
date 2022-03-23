import { RangeQuestion } from "../rangeQuestion";

function createThreeQuestion() {
  const question1 = new RangeQuestion({
    id: "id-1",
    content: "",
    parents: [],
    choices: [],
  });
  const question2 = new RangeQuestion({
    id: "id-2",
    content: "",
    parents: [],
    choices: [],
  });
  const question3 = new RangeQuestion({
    id: "id-3",
    content: "",
    parents: [],
    choices: [],
  });

  return { question1, question2, question3 };
}

function createThreeQuestionWithChoice() {
  const { question1, question2, question3 } = createThreeQuestion();

  question1
    .addChoice({
      lower: 0,
      upper: 5,
      child: question2.id,
    })
    .addChoice({
      lower: 6,
      upper: 10,
      child: question3.id,
    });

  return { question1, question2, question3 };
}

describe("Test For Range Question", () => {
  test("should create a range choice", () => {
    const { question1, question2 } = createThreeQuestion();

    question1.addChoice({
      upper: 3,
      lower: 1,
      child: question2.id,
    });

    expect(question1.choices.length).toBe(1);
    expect(question1.choices[0].child).toBe("id-2");
  });

  test("Should Add  proper range", () => {
    const { question1 } = createThreeQuestionWithChoice();
    expect(question1.choices.length).toBe(2);
    expect(question1.choices[1].child).toBe("id-3");
  });

  test("Should Remove a child", () => {
    const { question1, question2 } = createThreeQuestionWithChoice();

    question1.removeChild(question2.id);
    expect(question1.choices[0].child).toBeFalsy();
    expect(question1.choices[1].child).toBeTruthy();
  });

  test("Should Remove a Choice ", () => {
    const { question1 } = createThreeQuestionWithChoice();
    question1.removeChoice(question1.choices[0]);
    expect(question1.choices.length).toBe(1);
  });
});
