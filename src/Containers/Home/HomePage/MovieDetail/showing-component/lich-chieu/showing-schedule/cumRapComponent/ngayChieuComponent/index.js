import React, { useEffect } from "react";
import dayjs from "dayjs";
import { useSelector, useDispatch } from "react-redux";
export default function NgayChieuComponent(props) {
  const movie = props.movie;
  const dispatch = useDispatch();
  let currentDay = useSelector(
    (state) => state.showingShowDayReducer.currentDay
  );
  useEffect(() => {
    let itemDay = listDayTime[0];
    let action = { type: "update_current_day", e: itemDay };
    dispatch(action);
  }, [dispatch, movie]);
  //hàm update CurrentDay
  const handleUpdateCurrentDay = (e) => {
    let action = { type: "update_current_day", e };
    dispatch(action);
  };
  //xử lý ngày chiếu
  let listDayTime = [];
  let renderDayTime = () => {
    let checkIndexDayTime = (id) => {
      //hàm findIndex tìm vị trí
      return listDayTime.findIndex((item) => {
        return item === id;
      });
    };
    // let now = dayjs().format("DD/MM");
    movie.lichChieu.forEach((item) => {
      let dayCheck = dayjs(item.ngayChieuGioChieu).format("YYYY/MM/DD");
      let ind = checkIndexDayTime(dayCheck);
      if (ind === -1) {
        listDayTime.push(dayCheck);
      }
    });
    const oneDay = 24 * 60 * 60 * 1000;
    const lstLichChieuTheoPhimSorted = listDayTime.sort((a, b) =>
      dayjs(a).diff(dayjs(b))
    );
    let minDate = new Date(
      lstLichChieuTheoPhimSorted.reduce(function (a, b) {
        return a < b ? a : b;
      })
    );
    let maxDate = new Date(
      lstLichChieuTheoPhimSorted.reduce(function (a, b) {
        return a > b ? a : b;
      })
    );
    const diffDays = Math.round(Math.abs((minDate - maxDate) / oneDay));
    let listRender = [];
    for (let i = 0; i <= diffDays + 5; i++) {
      listRender.push(
        <li className="dayTimeItem text-center" key={i}>
          {/* <p style={{ fontSize: "18px", fontWeight: "600" }}></p> */}
          <button
            disabled={i >= diffDays + 1}
            className={`btn__day ${
              dayjs(currentDay).format("DD/MM/YYYY") ===
              dayjs(minDate).add(i, "day").format("DD/MM/YYYY")
                ? "btn__day__active"
                : ""
            }`}
            onClick={() => {
              handleUpdateCurrentDay(
                dayjs(minDate).add(i, "day").format("YYYY/MM/DD")
              );
            }}
          >
            {dayjs(minDate).add(i, "day").format("DD/MM")}
          </button>
        </li>
      );
    }
    // setShowDay({ listShowDayPhimSorted: listRender });
    listDayTime = lstLichChieuTheoPhimSorted;
    return listRender;
  };
  return <>{renderDayTime()}</>;
}