import React from "react";
import { useNavigate } from "react-router-dom";

interface Prop {
  title: string;
  count: number;
  materialUiIcon: React.ElementType;
  collectionName: string;
  filter: string;
  whatToFilter: string;
}

const DashboardCountingBox = ({
  title,
  count,
  materialUiIcon: MaterialUiIcon,
  collectionName,
  filter,
  whatToFilter,
}: Prop) => {
  const navigate = useNavigate();

  const redirectToParams = (
    collectionName: string,
    filter: string,
    whatToFilter: string
  ) => {
    const url = `/tableList?collectionName=${collectionName}&filter=${filter}&whatToFilter=${whatToFilter}&title=${title}`;
    navigate(url);
  };

  return (
    <div style={dashboardCountingBox}>
      <div style={dashboardCountingBoxCountainer}>
        <section style={dashboardInfoFirstSection}>
          <span style={titleFont}>{title}</span>
          <span style={countFont}>{count}</span>
        </section>
        <section
          style={iconContainer}
          onClick={() => redirectToParams(collectionName, filter, whatToFilter)}
        >
          {MaterialUiIcon && <MaterialUiIcon />}
        </section>
      </div>
    </div>
  );
};

export default DashboardCountingBox;

const dashboardCountingBox: React.CSSProperties = {
  width: "230px",
  height: "120px",
  backgroundColor: "#ffffff",
  borderRadius: "10px",
  padding: "20px",
};

const dashboardCountingBoxCountainer: React.CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  height: "100%",
};

const dashboardInfoFirstSection: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100%",
};

const iconContainer: React.CSSProperties = {
  padding: "15px",
  backgroundColor: "#F3F2F8",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "5px",
};

const titleFont: React.CSSProperties = {
  fontSize: "20px",
};

const countFont: React.CSSProperties = {
  fontSize: "30px",
  fontWeight: 700,
};
