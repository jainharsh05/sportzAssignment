import React from "react";

function Card({ play }) {
  const formatDate = (matchDate) => {
    var date = new Date(`${matchDate} UTC`);
    let converteddate = new Date(date.toString());
    const time = converteddate.toLocaleTimeString();
    const year = converteddate?.getFullYear();
    const month =
      converteddate?.getMonth() + 1 > 9
        ? converteddate?.getMonth() + 1
        : `0${converteddate?.getMonth() + 1}`;
    const Mdate =
      converteddate?.getDate() > 9
        ? converteddate?.getDate()
        : `0${converteddate?.getDate()}`;
    return `${Mdate}-${month}-${year} ${time}`;
  };
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src={`${play?.Id}.jpg`} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{play?.PFName}</h5>
        <p className="card-text">
          Skill = <strong>{play?.SkillDesc}</strong>
        </p>
        <p className="card-text">
          Value = <strong>{play?.Value} $ </strong>
        </p>
        <div>
          {play.UpComingMatchesList.map((el) => {
            return (
              <React.Fragment key={el.TID}>
                <p className="card-text">
                  Upcoming Match ={" "}
                  <strong>
                    {Boolean(el.VsCCode && el?.CCode)
                      ? `${el.VsCCode} v/s ${el.CCode} `
                      : "No Match"}
                  </strong>
                </p>
                <p className="card-text">
                  Match Date and time ={" "}
                  <strong>
                    {el.MDate ? formatDate(el.MDate) : "No Match Date"}"
                  </strong>
                </p>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Card;
