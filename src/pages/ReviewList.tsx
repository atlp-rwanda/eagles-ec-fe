import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "@mui/material";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";

import Spinner from "../components/dashboard/Spinner";
import Button from "../components/common/auth/Button";
import {
  fetchReviews,
  addReview,
  deleteReview,
  updateReview,
} from "../redux/reducers/reviewSlice";
import { RootState } from "../redux/store";
import { Review } from "../../type";
import { useAppDispatch } from "../redux/hooks";
import ReviewSchemaValiator from "../schemas/reviewSchema";

interface ReviewsListProps {
  productId: string;
}
interface FormErrors {
  newRating?: string;
  newFeedback?: string;
}
const ReviewsList: React.FC<ReviewsListProps> = ({ productId }) => {
  const dispatch = useAppDispatch();
  const [visibleReviews, setVisibleReviews] = useState<number>(3);
  const { reviews, isLoading, error } = useSelector(
    (state: RootState) => state.review,
  );
  const [newRating, setNewRating] = useState<string>("");
  const [newFeedback, setNewFeedback] = useState<string>("");
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [deletingReviewId, setDeletingReviewId] = useState<number | null>(null);
  const [errors, setError] = useState<FormErrors>({});
  const loggedInUserToken = localStorage.getItem("accessToken");
  let loggedInUser;
  if (loggedInUserToken) {
    // @ts-ignore
    loggedInUser = JSON.parse(atob(loggedInUserToken.split(".")[1]));
  }

  useEffect(() => {
    dispatch(fetchReviews({ productId }));
    setVisibleReviews(3);
  }, [dispatch, productId]);

  const handleLoadMore = () => {
    setVisibleReviews(visibleReviews + 3);
  };
  const handleAddReview = async () => {
    try {
      await ReviewSchemaValiator.validate(
        {
          newRating,
          newFeedback,
        },
        { abortEarly: false },
      );
      const response = await dispatch(
        addReview({
          productId,
          rating: newRating,
          feedback: newFeedback,
        }),
      );
      setNewRating("");
      setNewFeedback("");
      // @ts-ignore
      if (response && response.error) {
        // @ts-ignore
        toast.error(response.payload.message);
      } else {
        dispatch(fetchReviews({ productId }));
      }
    } catch (error: any) {
      if (error.name === "ValidationError") {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setError(validationErrors);
      } else {
        toast.error("Failed to add review");
      }
    }
  };
  const handleDeleteReview = async (id: number) => {
    setDeletingReviewId(id);
    const response = await dispatch(deleteReview({ productId, id }));
    setDeletingReviewId(null);
    // @ts-ignore
    if (response.error) {
      // @ts-ignore
      toast.error(response.payload.message);
    } else {
      toast.success("Review deleted successfully");
    }
  };

  const handleEditReview = (review: Review) => {
    setEditingReview(review);
    // @ts-ignore
    setNewRating(review.rating);
    setNewFeedback(review.feedback);
  };

  const handleUpdateReview = async () => {
    if (editingReview) {
      const response = await dispatch(
        updateReview({
          productId,
          // @ts-ignore
          id: editingReview.id,
          rating: newRating,
          feedback: newFeedback,
        }),
      );
      setEditingReview(null);
      setNewRating("");
      setNewFeedback("");

      // @ts-ignore
      if (response.error) {
        // @ts-ignore
        toast.error(response.payload.message);
      } else {
        dispatch(fetchReviews({ productId }));
      }
    }
  };
  return (
    <div>
      <h2 className="text-lg font-semibold pt-2 ml-3 sm:m-0">
        Reviews & feedback
      </h2>
      {!reviews ? (
        <div className="p-2 mt-2 w-[100%] sm:w-[100%]">
          No reviews yet. Be the first to review this product.
        </div>
      ) : (
        reviews.map((review) => (
          <div
            key={review.id}
            className="p-2 mt-2 w-[100%] sm:w-[60%] rounded-md bg-gray-10"
          >
            <div className="flex justify-between border-b">
              <div className="flex justify-center gap-2 items-center">
                <p className="pb-2 font-[500]">
                  {review.user?.name || loggedInUser.name}
                </p>
                <Rating
                  value={parseInt(review.rating, 10) || parseInt(newRating, 10)}
                  // disabled
                  size="small"
                />
                {deletingReviewId === parseInt(review.id, 10) && <Spinner />}
              </div>
              {review
                && review.user
                && loggedInUser
                && review.user.id === loggedInUser.id && (
                  <div className="flex gap-3">
                    <FiEdit
                      className="cursor-pointer"
                      onClick={() => {
                        // @ts-ignore
                        handleEditReview(review);
                      }}
                    />
                    <RiDeleteBin6Line
                      className="cursor-pointer"
                      onClick={() =>
                        handleDeleteReview(parseInt(review.id, 10))}
                    />
                  </div>
              )}
            </div>
            <p>{review.feedback || newFeedback}</p>
            {reviews.length > visibleReviews && (
              <button onClick={handleLoadMore}>Load More</button>
            )}
          </div>
        ))
      )}
      {!loggedInUserToken ? (
        ""
      ) : (
        <div className="mt-4">
          <h3 className="text-md font-semibold">
            {editingReview ? "Edit Review" : "Review this product"}
          </h3>
          <div className="flex flex-col gap-2 w-[100%] sm:w-[60%]">
            <Rating
              value={parseInt(newRating, 10)}
              onChange={(e, newValue) => {
                setNewRating(String(newValue));
                if (errors.newRating) {
                  setError({ ...errors, newRating: undefined });
                }
              }}
            />
            {errors.newRating && (
              <p className="text-red-500">{errors.newRating}</p>
            )}
            <textarea
              value={newFeedback}
              onChange={(e) => {
                setNewFeedback(e.target.value);
                if (errors.newFeedback) {
                  setError({ ...errors, newFeedback: undefined });
                }
              }}
              placeholder="Write your feedback"
              className="border-2 border-[#DB4444] p-2 rounded"
            />
            {errors.newFeedback && (
              <p className="text-red-500">{errors.newFeedback}</p>
            )}
            <Button
              text={
                isLoading
                  ? "Loading..."
                  : editingReview
                    ? "Update Review"
                    : "Add Review"
              }
              backgroundColor="bg-[#DB4444]"
              disabled={isLoading}
              data-testid="revUpdatete-btn"
              className="w-[100%] sm:w-[30%]"
              onClick={editingReview ? handleUpdateReview : handleAddReview}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsList;
