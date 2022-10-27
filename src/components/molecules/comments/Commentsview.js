import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Helper_Contants } from "../../../helpers/helper.constants";
import { getSessionVariable } from "../../../helpers/session.maintainance";
import { setAlert } from "../../../redux/alerts/alert.slice";
import { ALERT_TYPES } from "../../../redux/alerts/alerts.constants";
import {
  createComment,
  getEmployeeComments,
} from "../../../redux/comments/comments.slice";
import Button, { Button_Variants } from "../../atoms/button/index";
import Toast from "../toastr/index";
import moment from "moment";
import Loader from "../../atoms/loader/Loader";

const Commentsview = () => {
  const { id } = useParams();

  const { employeeDetails } = useSelector((state) => state.employeeManagement);
  const { comments, isLoading } = useSelector(
    (state) => state.commentsManagement
  );

  const userInfo = JSON.parse(getSessionVariable(Helper_Contants.USERINFO));
  const dispatch = useDispatch();

  const initialField = {
    comment: "",
    authorId: userInfo.id,
    employeeId: employeeDetails._id,
  };
  const [commentField, setCommentField] = useState(initialField);

  const changeCommentField = (value) => {
    const newChangesInComment = {
      ...initialField,
      comment: value,
    };
    setCommentField(newChangesInComment);
  };

  const handleCommentSend = () => {
    dispatch(createComment(commentField))
      .unwrap()
      .then(() => {
        setCommentField(initialField);
        dispatch(getEmployeeComments(id));
      })
      .catch((error) => {
        dispatch(
          setAlert({
            text: error.message,
            type: ALERT_TYPES.ERROR,
          })
        );
      });
  };

  return (
    <div className="bg-white shadow sm:overflow-hidden sm:rounded-lg">
      <Toast />
      {isLoading ? (
        <Loader requireCount={8}/>
      ) : (
        <>
          <div className="divide-y divide-gray-200">
            <div className="px-4 py-5 sm:px-6">
              <h2
                id="comments-title"
                className="text-lg font-medium text-gray-900"
              >
                Comments
              </h2>
            </div>
            <div className="px-4 py-6 sm:px-6">
              <ul role="list" className="space-y-8">
                {comments.map((empComment) => (
                  <li key={empComment._id}>
                    <div className="flex space-x-3">
                      <div className="flex-shrink-0">
                        <svg
                          className="mx-auto h-10 w-10 rounded-full text-gray-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {empComment.authorId.lastName}{" "}
                          {empComment.authorId.firstName}
                        </div>
                        <div className="mt-1 text-sm text-gray-700">
                          <p>{empComment.comment}</p>
                        </div>
                        <div className="mt-2 space-x-2 text-sm">
                          <span className="font-medium text-gray-500">
                            {moment(empComment.createdAt).fromNow(true)} ago
                            <i className="text-xs ml-2">
                              {moment(empComment.createdAt).format(
                                "DD/MM/YYYY HH:mm"
                              )}
                            </i>
                          </span>{" "}
                          {/* <span className="font-medium text-gray-500">
                        &middot;
                      </span>{" "}
                      <button
                        type="button"
                        className="font-medium text-gray-900"
                      >
                        Reply
                      </button> */}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-6 sm:px-6">
            <div className="flex space-x-3">
              <div className="flex-shrink-0">
                <svg
                  className="mx-auto h-10 w-10 rounded-full text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <div>
                  <label htmlFor="comment" className="sr-only">
                    About
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    rows={3}
                    className="block w-full rounded-md py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Comment your thought !"
                    value={commentField.comment}
                    onChange={(e) => changeCommentField(e.target.value)}
                  />
                </div>
                <div className="mt-3 flex items-center justify-end">
                  <Button
                    variant={Button_Variants.SUBMIT}
                    click={() => handleCommentSend()}
                    isDisabled={commentField.comment === ""}
                  >
                    Comment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Commentsview;
