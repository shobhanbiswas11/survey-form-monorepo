import { MCQuestion } from "../mCQuestion";

function cerateThreeQuestion() {
  const question1 = new MCQuestion({
    id: "id-1",
    choices: [],
    content: "",
    parents: [],
  });
  const question2 = new MCQuestion({
    id: "id-2",
    choices: [],
    content: "",
    parents: [],
  });
  const question3 = new MCQuestion({
    id: "id-3",
    choices: [],
    content: "",
    parents: [],
  });

  return { question1, question2, question3 };
}

function createThreeQuestionWithChoice() {
  const { question1, question2, question3 } = cerateThreeQuestion();

  question1
    .addChoice({
      content: "c1",
      child: question2.id,
    })
    .addChoice({
      content: "c2",
      child: question3.id,
    });

  return { question1, question2, question3 };
}

describe("Test for Multiple Choice Question", () => {
  test("Should add the id if not pass", () => {
    const question = new MCQuestion({
      choices: [],
      content: "",
      parents: [],
    });

    expect(question.id).toBeTruthy();
  });

  test("Id can be passed when created", () => {
    const question = new MCQuestion({
      id: "id-1",
      choices: [],
      content: "",
      parents: [],
    });
    expect(question.id).toBe("id-1");
  });

  test("Choice can be added", () => {
    const { question1, question2, question3 } = cerateThreeQuestion();

    question1.addChoice({
      content: "Choice-1",
      child: question2.id,
    });

    expect(question1.choices.length).toBe(1);
    expect(question1.choices[0].content).toBe("Choice-1");
    expect(question1.choices[0].child).toBe("id-2");

    question1.addChoice({
      content: "c-2",
      child: question3.id,
    });

    expect(question1.choices.length).toBe(2);
    expect(question1.choices[1].child).toBe("id-3");
  });

  test("Child Can't be added if choice is not there", () => {
    const { question1, question2 } = cerateThreeQuestion();

    expect(() => {
      question1.addChild({
        choiceOrder: 1,
        childId: question2.id,
      });
    }).toThrowError();
  });

  test("child can be added if choice is there", () => {
    const { question1, question2 } = cerateThreeQuestion();

    question1.addChoice({
      content: "c-1",
    });

    question1.addChild({
      childId: question2.id,
      choiceOrder: 0,
    });

    expect(question1.choices[0].child).toBe("id-2");
  });

  test("Child can be removed", () => {
    const { question1, question2, question3 } = createThreeQuestionWithChoice();

    expect(question1.choices[0].child).toBe("id-2");
    question1.removeChild(question2.id);

    expect(question1.choices[0].child).toBeFalsy();
    expect(question1.choices[1].child).toBe("id-3");
  });

  test("Should Remove a Choice ", () => {
    const { question1 } = createThreeQuestionWithChoice();
    question1.removeChoice(question1.choices[0]);
    expect(question1.choices.length).toBe(1);
  });

  test("should return all the connected child", () => {
    const { question1 } = createThreeQuestionWithChoice();

    expect(question1.connectedChildren).toEqual(["id-2", "id-3"]);
  });
});
