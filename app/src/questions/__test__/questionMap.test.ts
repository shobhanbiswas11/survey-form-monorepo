import { MCQuestion } from "../mCQuestion";
import { QuestionMap } from "../questionMap";
import { RangeQuestion } from "../rangeQuestion";
import { QuestionType } from "../type";

function createFiveQuestion() {
  const rangeQuestion1 = new RangeQuestion({
    content: "",
    parents: [],
    choices: [],
  });
  const rangeQuestion2 = new RangeQuestion({
    content: "",
    parents: [],
    choices: [],
  });
  const mCQuestion1 = new MCQuestion({
    choices: [],
    content: "",
    parents: [],
  });
  const mCQuestion2 = new MCQuestion({
    choices: [],
    content: "",
    parents: [],
  });
  const mCQuestion3 = new MCQuestion({
    choices: [],
    content: "",
    parents: [],
  });

  return {
    rangeQuestion1,
    rangeQuestion2,
    mCQuestion1,
    mCQuestion2,
    mCQuestion3,
  };
}

function addFiveQuestionToMap() {
  const {
    mCQuestion1,
    mCQuestion2,
    mCQuestion3,
    rangeQuestion1,
    rangeQuestion2,
  } = createFiveQuestion();
  const map = new QuestionMap();
  map
    .add(mCQuestion1)
    .add(mCQuestion2)
    .add(mCQuestion3)
    .add(rangeQuestion1)
    .add(rangeQuestion2);

  return {
    mCQuestion1,
    mCQuestion2,
    mCQuestion3,
    rangeQuestion1,
    rangeQuestion2,
    map,
  };
}

function addConnection() {
  const {
    map,
    rangeQuestion1,
    rangeQuestion2,
    mCQuestion1,
    mCQuestion2,
    mCQuestion3,
  } = addFiveQuestionToMap();

  mCQuestion1
    .addChoice({
      content: "1-c-1",
    })
    .addChoice({
      content: "1-c-2",
    });

  map.connectToMCQ(mCQuestion1.id, {
    childId: rangeQuestion1.id,
    choiceOrder: 0,
  });

  map.connectToMCQ(mCQuestion1.id, {
    childId: mCQuestion2.id,
    choiceOrder: 1,
  });

  rangeQuestion1.addChoice({
    lower: 1,
    upper: 5,
  });

  map.connectToRange(rangeQuestion1.id, {
    childId: mCQuestion3.id,
    choiceOrder: 0,
  });

  return {
    map,
    rangeQuestion1,
    mCQuestion1,
    mCQuestion2,
    rangeQuestion2,
    mCQuestion3,
  };
}

describe("Test for the question map", () => {
  test("create a question map", () => {
    const map = new QuestionMap();
    expect(map).toBeInstanceOf(QuestionMap);
  });

  test("add new Question", () => {
    const { rangeQuestion1, rangeQuestion2, mCQuestion1 } =
      createFiveQuestion();

    const map = new QuestionMap();
    map.add(rangeQuestion1).add(rangeQuestion2).add(mCQuestion1);

    expect(map.questions.length).toBe(3);
  });

  test("should connect two question", () => {
    const { map, rangeQuestion1, mCQuestion1 } = addFiveQuestionToMap();

    mCQuestion1.addChoice({
      content: "1-c-1",
    });

    map.connectToMCQ(mCQuestion1.id, {
      childId: rangeQuestion1.id,
      choiceOrder: 0,
    });

    expect(map.get(rangeQuestion1.id)?.parents).toContain(mCQuestion1.id);
    expect(map.get(mCQuestion1.id)?.choices[0].child).toBe(rangeQuestion1.id);
  });

  test("Remove question should destroy the child relation", () => {
    const { map, mCQuestion1, mCQuestion2 } = addConnection();

    map.remove(mCQuestion2.id);
    expect(map.get(mCQuestion1.id)?.choices[1].child).toBeFalsy();
  });

  test("Remove question should destroy the parent relation", () => {
    const { map, mCQuestion1, mCQuestion2 } = addConnection();
    map.remove(mCQuestion1.id);
    expect(mCQuestion2.parents.length).toBe(0);
  });

  test("Disconnect Two Questions", () => {
    const { map, mCQuestion1, mCQuestion2 } = addFiveQuestionToMap();

    (map.get(mCQuestion1.id) as MCQuestion)?.addChoice({
      content: "choice-1",
    });
    map.connectToMCQ(mCQuestion1.id, {
      childId: mCQuestion2.id,
      choiceOrder: 0,
    });

    map.disconnect(mCQuestion1.id, mCQuestion2.id);

    expect(mCQuestion1.connectedChildren.length).toBe(0);
    expect(mCQuestion2.parents.length).toBe(0);
    expect(mCQuestion1.choices[0].content).toBe("choice-1");
  });

  test("Create Map from serialized values", () => {
    // const { map } = addConnection();
    // console.log(
    //   JSON.stringify(
    //     map.questions.map((q) => q.serialize()),
    //     null,
    //     4
    //   )
    // );

    const questions: any = [
      {
        choices: [
          {
            content: "1-c-1",
            child: "33b9f258-8ca8-4bbb-9c5b-fcde3f191e99",
          },
          {
            content: "1-c-2",
            child: "a82a4736-d470-4c6b-8c4f-3869b6e1b07c",
          },
        ],
        content: "",
        parents: [],
        id: "cc8ff60c-9260-4591-89f2-c2703c8b404f",
        type: "MCQuestion",
      },
      {
        choices: [],
        content: "",
        parents: ["cc8ff60c-9260-4591-89f2-c2703c8b404f"],
        id: "a82a4736-d470-4c6b-8c4f-3869b6e1b07c",
        type: "MCQuestion",
      },
      {
        choices: [],
        content: "",
        parents: ["33b9f258-8ca8-4bbb-9c5b-fcde3f191e99"],
        id: "84c3c726-2e97-43ba-ba78-cc2b4f870270",
        type: "MCQuestion",
      },
      {
        content: "",
        parents: ["cc8ff60c-9260-4591-89f2-c2703c8b404f"],
        choices: [
          {
            lower: 1,
            upper: 5,
            child: "84c3c726-2e97-43ba-ba78-cc2b4f870270",
          },
        ],
        id: "33b9f258-8ca8-4bbb-9c5b-fcde3f191e99",
        type: "RangeQuestion",
      },
      {
        content: "",
        parents: [],
        choices: [],
        id: "4fbd309e-575d-494a-a8ba-bdc04e19e8e1",
        type: "RangeQuestion",
      },
    ];

    const map = QuestionMap.create(questions);

    expect(map.get("33b9f258-8ca8-4bbb-9c5b-fcde3f191e99")?.type).toBe(
      QuestionType.RangeQuestion
    );

    expect(map.questions.length).toBe(5);
    expect(
      map.get("cc8ff60c-9260-4591-89f2-c2703c8b404f")?.connectedChildren.length
    ).toBe(2);
  });
});
