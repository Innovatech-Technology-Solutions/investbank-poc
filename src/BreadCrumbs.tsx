import React from "react";
import { Link } from "react-router-dom";
import {
  useGetInterfaceByIDQuery,
  useGetTaskActionQuery,
  usePerformActionMutation,
} from "./services/hostApiServices";
import useLanguage from "./hooks/useLanguage";

type itemFeedType = {
  label: string;
  path: string;
};

type BreadcrumbsProps = {
  itemFeed: itemFeedType[];
  homePath: string;
  showHome?: boolean;
  onItemClick?: (item: string) => void;
  homeTitle?: string;
};
const BreadCrumbs = ({
  itemFeed,
  homePath,
  homeTitle = "Home",
  showHome = true,
  onItemClick = () => {},
}: BreadcrumbsProps) => {
  const { data: uiData } = useGetInterfaceByIDQuery("159");
  const { language } = useLanguage();
  const uiConfiguration = uiData?.[language || "EN"];
  console.log("bb", uiConfiguration);

  return (
    <nav aria-label="Breadcrumb" className="aegov-breadcrumb with-seperator">
      <ol>
        {showHome && (
          <li>
            <Link to={homePath} onClick={() => onItemClick("home")}>
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
              >
                <rect width="256" height="256" fill="none" />
                <path
                  d="M152,208V160a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v48a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V115.54a8,8,0,0,1,2.62-5.92l80-75.54a8,8,0,0,1,10.77,0l80,75.54a8,8,0,0,1,2.62,5.92V208a8,8,0,0,1-8,8H160A8,8,0,0,1,152,208Z"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                />
              </svg>
              {uiConfiguration?.UI_LABELS?.HOME || homeTitle}
            </Link>
          </li>
        )}
        {itemFeed?.map((item: itemFeedType, index: number) => {
          const key = `${item?.label}-${index}`;
          return (
            <li key={key}>
              {index !== itemFeed?.length - 1 ? (
                <Link
                  onClick={() => onItemClick(item?.label)}
                  to={item?.path}
                  title={item?.label}
                >
                  {item?.label}
                </Link>
              ) : (
                <span aria-current="page">{item?.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadCrumbs;
