import * as yup from "yup";

const ReviewSchemaValiator = yup.object().shape({
  newRating: yup.string().required("Rating is required"),
  newFeedback: yup.string().required("Feedback is required"),
});

export default ReviewSchemaValiator;
