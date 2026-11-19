/** The Lesson's quiz, a Student's best attempt, and grading a submission. */
export {
  getQuizByLessonId,
  getQuizWithQuestions,
  getBestAttempt,
  calculateGrade,
  computeResult,
  type QuestionResult,
} from "./lib/quiz.server";
