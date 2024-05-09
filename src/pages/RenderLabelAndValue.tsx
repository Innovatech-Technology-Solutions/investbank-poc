/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tooltip } from "antd";
import { ReactNode, useState } from "react";
import { ChatCircleText } from "@phosphor-icons/react";
import Modal from "../Modal";
import Button from "../Button";
import TextArea from "../TextArea";
import SectionHeader from "./SectionHeader";
import { usePostFieldCommentMutation } from "../services/hostApiServices";
import { useParams } from "react-router";
import { isValidApiResponse } from "../utils/Commonutils";
import emitMessage from "../services/emitMessage";
const RenderLabelAndValue = ({
  label,
  value,
  className,
  fieldKey,
  valueStyles,
  tooltip = false,
}: {
  label: ReactNode;
  value: ReactNode;
  className?: string;
  valueStyles?: string;
  tooltip?: boolean;
  fieldKey?: string;
}) => {
  const [showCommentIcon, setShowCommentIcon] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState("");
  
  const [field, setField] = useState("");


const[postFieldComment]=usePostFieldCommentMutation()
  const handleChange = (e: any) => {
    setComment(e.target.value);
  };
const{requestIDSlug}=useParams()
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setComment("");
    setShowModal(false);
    setShowCommentIcon(false);
    setField('')
  };

  const handleCancel = () => {
    setComment("");
    setShowModal(false);
    setShowCommentIcon(false);
    setField('')

  };

  return (
    <>
      {showModal ? (
        <Modal
          showFooter={false}
          body={
            <form onSubmit={handleSubmit}>
              <div className="pb-2">
                <SectionHeader title={"Comment"} />
              </div>

              <TextArea
                value={comment}
                onChange={handleChange}
                rows={4}
                cols={50}
                placeholder="Enter your comment here"
                required
                id={"comment"}
                name={"comment"}
                isError={false}
              />
              <div className="flex gap-2  justify-end pt-2">
                <Button type="button" onClick={handleCancel}>
                  Close
                </Button>
                <Button type="submit" onClick={async()=>
                {

                  try{
                    const res=postFieldComment(

                    {
                     
                      "requestId": requestIDSlug,
                     
                      "comment": comment,
                     
                      "fieldId":fieldKey ,
                    }
                  )
                  if(isValidApiResponse(res))
                  {
                    emitMessage("Addedd Comment Successfully",'success')
                  }
                  }
                  catch(e)
                  {
                    //
                  }
                }}>Save</Button>
              </div>
            </form>
          }
        />
      ) : null}

      <div id={`${fieldKey}`}
        onMouseEnter={() => setShowCommentIcon(true)}
        onMouseLeave={() => setShowCommentIcon(false)}
        className={`flex flex-col justify-start gap-1 ${fieldKey} ${className}`}
      >
        <div className="font-medium font-size-responsive text-[#8D8E90] font-roboto line-height-[16.41px]">
          <div className="flex gap-1">
            {label}
            {showCommentIcon ? (
              <ChatCircleText
                onClick={() => {
                  setShowModal(true);
                  setField(fieldKey as any)
                }}
                color="#BD982E"
                size={16}
              />
            ) : null}
          </div>
        </div>

        {tooltip ? (
          <Tooltip title={value}>
            <div
              className={`font-medium font-size-responsive text-[#323438] font-roboto line-height-[16.41px] ${
                valueStyles ? valueStyles : "text-justify"
              }`}
            >
              {value}
            </div>
          </Tooltip>
        ) : (
          <div
            className={`font-medium font-size-responsive text-[#323438] font-roboto line-height-[16.41px] ${
              valueStyles ? valueStyles : "text-justify"
            }`}
          >
            {value}
          </div>
        )}
      </div>
    </>
  );
};
export default RenderLabelAndValue;
