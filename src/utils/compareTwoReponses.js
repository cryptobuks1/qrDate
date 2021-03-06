export default (_response, _response1) => {
  const response = _response.qAndAs ? _response.qAndAs : _response
  const response1 = _response1.qAndAs ? _response1.qAndAs : _response1
  if (response.length !== response1.length) {
    throw Error(
      "Responses should contain same number of questions and answers."
    );
  }
  let score = 0;
  const sharedAnswers = [];
  if (response)
  // Refactor to just use object.keys and values outside the loop
    response.forEach((res, i) => {
      const otherResponse = response1.slice(0)
      const counterRes = otherResponse[i]
      if (
        Object.keys(res)[0] === Object.keys(counterRes)[0] &&
        Object.values(res)[0] === Object.values(counterRes)[0]
      ) {
        score++
        sharedAnswers.push(res)
      }
    });
  // shared answers will be used to give a random ice breaker question
  return { score, sharedAnswers };
};

//Example survey and responses
// const surveyJson = {
//   surveyFields: {
//     name: "hello",
//     status: "Active",
//     questionsJson: {
//       data: [
//         {
//           question: "Would you rather become...?",
//           answers: [
//             "40% Robot",
//             "Live the rest of your life without technology",
//             "Technology? I can barely deal with my flip phone"
//           ]
//         },

//         {
//           question: "Your go-to Bodega order",
//           answers: [
//             "Bacon Egg and Cheese",
//             "Jamaican Patty",
//             "Smoothie",
//             "Deli Sandwich "
//           ]
//         },
//         {
//           question: "Which drink do you prefer",
//           answers: [
//             "Negroni",
//             "Margarita",
//             "A good old beer",
//             "Glass of wine",
//             "A joint"
//           ]
//         }
//       ]
//     }
//   }
// };

// // Assumes everyone has the same survey questions
// const response = [
//   {
//     question: "Would you rather become...?",
//     answer: "Technology? I can barely deal with my flip phone"
//   },

//   {
//     question: "Your go-to Bodega order",
//     answers: "Bacon Egg and Cheese"
//   },
//   {
//     question: "Which drink do you prefer",
//     answers: "Negroni"
//   }
// ];

// const response1 = [
//   {
//     question: "Would you rather become...?",
//     answer: "Technology? I can barely deal with my flip phone"
//   },

//   {
//     question: "Your go-to Bodega order",
//     answers: "Bacon Egg and Cheese"
//   },
//   {
//     question: "Which drink do you prefer",
//     answers: "Negroni"
//   }
// ];