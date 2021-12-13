import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useUserAuth } from "../../contexts/UserAuthContext";
import { useAdminAuth } from "../../contexts/AdminAuthContext";
import { PeriodCheckService } from "../../lib/PeriodCheck";

const periodCheck = new PeriodCheckService();

export default function UserAuthRoute({ component: Component, ...rest }: any) {
  const { state } = useUserAuth();
  const adState = useAdminAuth();

  // admin is pass this check
  if (!adState.state.isAuthrized) {
    const periodCondition = periodCheck.checkRange();
    if (periodCondition.data === "Before") {
      const dates = periodCheck.getStartAndEndDate();
      return (
        <>
          <p>閲覧可能期間前となります。</p>
          <p>下記の日程にてアクセスをお願いします。</p>
          <p>
            {dates[0]} ~ {dates[1]}
          </p>
        </>
      );
    } else if (periodCondition.data === "After") {
      return (
        <>
          <p>閲覧可能期間は終了しました。</p>
          <p>また来年お会いできることを楽しみにしています。</p>
        </>
      );
    }
  }

  return (
    <Route
      {...rest}
      render={(props) => {
        return state.isAuthrized ? (
          <Component {...props} />
        ) : (
          <Redirect to={"user_login" + props.location?.pathname} />
        );
      }}
    ></Route>
  );
}
