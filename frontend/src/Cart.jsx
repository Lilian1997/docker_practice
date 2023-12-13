import React, { Fragment, useContext, useEffect, useState } from "react";

import TicketType from "./Ticket";
import SelectedTicketype from "./SelectedTicket";
import axios from "axios";
import SessionButton from "./SessionButton";
import DATE from "./DateSelect";
import { ContextA } from "./ContextA";
import { useHistory } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Cart() {
  const navigate = useHistory();
  const { OrderPass, setOrderPass } = useContext(ContextA);
  const { OrderID, setOrderID } = useContext(ContextA);
  const { OrderDate, setOrderDate } = useContext(ContextA);
  const { OrderSession, setOrderSession } = useContext(ContextA);

  const [noTicketshow, setNoTicketShow] = useState(false);
  const handleNoTicketShow = () => setNoTicketShow(true);
  const handleNoTicketClose = () => setNoTicketShow(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const handleDeleteShow = () => setDeleteShow(true);
  const handleDeleteClose = () => setDeleteShow(false);
  const [somethingWrongShow, setSomethingWrongShow] = useState(false);
  const handleSomethingWrongShow = () => setSomethingWrongShow(true);
  const handleSomethingWrongClose = () => setSomethingWrongShow(false);

  const GetAmount = () => {
    return (
      parseInt(
        document.getElementById(`InCart_AdultTicket_Amount`) === null
          ? 0
          : document.getElementById(`InCart_AdultTicket_Amount`).value
      ) +
      parseInt(
        document.getElementById(`InCart_StudentTicket_Amount`) === null
          ? 0
          : document.getElementById(`InCart_StudentTicket_Amount`).value
      ) +
      parseInt(
        document.getElementById(`InCart_KidTicket_Amount`) === null
          ? 0
          : document.getElementById(`InCart_KidTicket_Amount`).value
      ) +
      parseInt(
        document.getElementById(`InCart_ConcessionTicket_Amount`) === null
          ? 0
          : document.getElementById(`InCart_ConcessionTicket_Amount`).value
      )
    );
  };

  const [totalPrice2, setTotalPrice2] = useState(GetAmount());

  // 抓目前資料庫中可選購的日期作為options
  const [DateSelect, setDateSelect] = useState([]);

  const selectOptions = async () => {
    let url = "http://localhost:2407/Ticket/Cart/DateSelect";
    await axios
      .get(url)
      .then(function (response) {
        let DateData = response.data.data.map(function (element) {
          return (
            new Date(element.date).getFullYear() +
            "-" +
            (new Date(element.date).getMonth() + 1) +
            "-" +
            ("0" + new Date(element.date).getDate()).slice(-2)
          );
        });

        // 刪掉重複的
        const uniqueDateData = DateData.filter((value, index, self) => {
          return self.indexOf(value) === index;
        });

        console.log(uniqueDateData);
        setDateSelect(uniqueDateData);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    selectOptions();
    window.scrollTo(0, 0);
  }, []);

  // 調查場次是否available
  let [disabledSession, setdisabledSession] = useState({
    nine: 0,
    twelve: 0,
    fifteen: 0,
  });
  const sessionAvailable = async (e) => {
    console.log(disabledSession);
    console.log(disabledSession.nine);

    let posturl = "http://localhost:2407/Ticket/Cart/SessionSelect";

    let Session = [];
    await axios
      .post(posturl, { date: e })
      .then(function (response) {
        Session = response.data.data;
        console.log(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    if (Array.isArray(Session)) {
      const expectedSessions = [9, 12, 15];

      // 初始化一个对象，用于跟踪哪些会话需要禁用
      let sessionsToDisable = {};

      expectedSessions.forEach((ses) => {
        // 默认为需要禁用
        sessionsToDisable[ses] = true;

        // 如果会话在 Session 数组中存在，则不需要禁用
        if (Session.some((item) => item.session === ses)) {
          sessionsToDisable[ses] = false;
        }
      });

      // 更新 disabledSession，只禁用需要禁用的会话
      setdisabledSession((prevState) => ({
        ...prevState,
        nine: sessionsToDisable[9] ? 1 : 0,
        twelve: sessionsToDisable[12] ? 1 : 0,
        fifteen: sessionsToDisable[15] ? 1 : 0,
      }));
    }
  };

  // 選場次
  const [selectedSessionOption, setselectedSessionOption] = useState("");
  function SessionHandler(event) {
    setselectedSessionOption(event.target.value);
    setOrderSession(event.target.value);
  }

  useEffect(() => {
    setselectedSessionOption("");
    setOrderSession("");
  }, [disabledSession]);

  // 選日期
  const [selectedDATEOption, setselectedDATEOption] = useState(DateSelect);
  function DATEHandler(event) {
    setselectedDATEOption(event.target.value);
    sessionAvailable(event.target.value);
    setOrderDate(event.target.value);
  }

  // 票券內容
  const TicketlistDetail = [
    {
      id: 1,
      Name: "成人票",
      TicketPrice: 300,
      Label: "Adult",
      checked: 0,
      count: 0,
    },
    {
      id: 2,
      Name: "學生票",
      TicketPrice: 250,
      Label: "Student",
      checked: 0,
      count: 0,
    },
    {
      id: 3,
      Name: "孩童票",
      TicketPrice: 200,
      Label: "Kid",
      checked: 0,
      count: 0,
    },
    {
      id: 4,
      Name: "博愛票",
      TicketPrice: 200,
      Label: "Concession",
      checked: 0,
      count: 0,
    },
  ];

  let [tickets, setTickets] = useState(TicketlistDetail);

  const SelectedTicketlistDetail = [
    {
      id: 1,
      Name: "成人票",
      TicketPrice: 300,
      Label: "Adult",
      checked: 0,
      count: 0,
    },
    {
      id: 2,
      Name: "學生票",
      TicketPrice: 250,
      Label: "Student",
      checked: 0,
      count: 0,
    },
    {
      id: 3,
      Name: "孩童票",
      TicketPrice: 200,
      Label: "Kid",
      checked: 0,
      count: 0,
    },
    {
      id: 4,
      Name: "博愛票",
      TicketPrice: 200,
      Label: "Concession",
      checked: 0,
      count: 0,
    },
  ];

  const [selectedTickets, setSelectedTickets] = useState([]);

  let getInputValues = () => {
    return [
      parseInt(document.getElementById("AdultTicket_Count").value),
      parseInt(document.getElementById("StudentTicket_Count").value),
      parseInt(document.getElementById("KidTicket_Count").value),
      parseInt(document.getElementById("ConcessionTicket_Count").value),
    ];
  };

  // 計算訂單總計
  const calculateTotalPrice = (selectedTickets) => {
    let totalPrice = 0;

    for (let ticket of selectedTickets) {
      totalPrice +=
        (ticket ? ticket : 0).count * (ticket ? ticket : 0).TicketPrice;
    }
    setTotalPrice2(totalPrice);
  };

  // 刪除
  const Delete = (e) => {
    handleDeleteShow();

    let NewInputValue = {};
    let updatedTickets = [];

    NewInputValue = [...selectedTickets];
    console.log(NewInputValue);

    updatedTickets = NewInputValue.map((item) => {
      if (e.target.name == item.Label) {
        item.count = "";
        return item;
      } else {
        return item;
      }
    });

    updatedTickets = updatedTickets.filter((item) => item.count !== "");
    // console.log(updatedTickets);
    setSelectedTickets(updatedTickets);
    calculateTotalPrice(selectedTickets);
  };

  let totalPriceInNewCart = totalPrice2;

  // 加入購物車
  let AddIntoCart = async (e) => {
    let isAvailable = await AvailableCheck2();

    if (isAvailable) {
      let NewCart = [...selectedTickets];

      const NewInputValue = getInputValues(); //加入購物車按下去的時候取得各個input值
      const ans = NewInputValue.map((element, index) => ({
        index: index,
        id: index + 1,
        Name: SelectedTicketlistDetail[index].Name,
        TicketPrice: SelectedTicketlistDetail[index].TicketPrice,
        Label: SelectedTicketlistDetail[index].Label,
        count: element,
      })).filter((element) => element.count > 0); //過濾出非0的值 傳回一個陣列出來

      // 把東西放進去cart陣列  購物車狀態

      NewCart = NewCart.concat(ans);

      NewCart.sort(function (a, b) {
        return a.index - b.index;
      });

      await setSelectedTickets(NewCart);

      totalPriceInNewCart = 0;
      for (let i = 0; i < NewCart.length; i++) {
        totalPriceInNewCart += NewCart[i].count * NewCart[i].TicketPrice;
      }

      setTotalPrice2(totalPriceInNewCart);
      return NewCart;
    } else {
      handleNoTicketShow();
    }
  };

  // 計算剩餘票券是否足夠  結帳、selectedTicket

  const AvailableCheck = async (e) => {
    return new Promise((resolve, reject) => {
      let url = "http://localhost:2407/Ticket/Cart/Ava";
      // 根據日期跟場次去資料庫抓剩票券的數量

      let Total = selectedTickets.reduce(
        (acc, element) => acc + element.count,
        0
      );

      if (e) {
        Total = Total + 1;
      }

      let data = {
        date: selectedDATEOption,
        session: selectedSessionOption,
        total: Total,
      };

      axios
        .post(url, data)
        .then(function (response) {
          console.log(response);
          if (response.data === "Available") {
            console.log("票夠");

            resolve(true);
          } else {
            console.log("票不夠");

            resolve(false);
          }
        })
        .catch(function (error) {
          console.log(error);
          resolve(false);
        });
    });
  };

  // 計算剩餘票券是否足夠  票、加入購物車
  const AvailableCheck2 = async (e) => {
    console.log(e);
    return new Promise((resolve, reject) => {
      let url = "http://localhost:2407/Ticket/Cart/Ava";
      // 根據日期跟場次去資料庫抓剩票券的數量

      let Total = getInputValues().reduce((acc, element) => acc + element, 0);
      console.log(Total);

      if (e) {
        Total = Total + 1;
      }

      let data = {
        date: selectedDATEOption,
        session: selectedSessionOption,
        total: Total,
      };

      axios
        .post(url, data)
        .then(function (response) {
          console.log(response);
          if (response.data === "Available") {
            console.log("票夠");

            resolve(true);
          } else {
            console.log("票不夠");

            resolve(false);
          }
        })
        .catch(function (error) {
          console.log(error);
          resolve(false);
        });
    });
  };

  // 呈現購物車中選購的日期
  let DateYYMMDD = () => {
    let YYMMDD = document.getElementById("DateYYMMDD").value;

    return YYMMDD;
  };

  // 呈現購物車中選購的場次
  let Whichsession = () => {
    let Session = document.querySelector("[name=ChooseSession]:checked").value;
    // console.log(Session);

    if (Session === "9") {
      return "9:00";
    } else if (Session === "12") {
      return "12:00";
    } else {
      return "15:00";
    }
  };

  // 產生票券編號
  let ticketID = "";

  const GenerateTickets = (element) => {
    for (let i = 1; i <= element.count; i++) {
      let url = "http://localhost:2407/Ticket/Cart";

      let selectedDate = document.getElementById("DateYYMMDD").value;
      let selectedSession = document.querySelector(
        "[name=ChooseSession]:checked"
      ).value;
      ticketID = generateOrderSerial(8);

      let sendData = {
        ticket_type: element.Name,
        valid: 1,
        date: selectedDate,
        session: selectedSession,
        order_id: orderID,
        ticket_id: ticketID,
      };

      console.log(sendData);

      axios
        .post(url, sendData)
        .then(function (response) {
          if ((response.status = 200)) {
            console.log("OK");
          }
        })
        .catch(function (error) {
          console.log(error);
          handleSomethingWrongShow();
        });
    }
  };

  // 製造編碼
  function generateOrderSerial(Num) {
    let chars = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      serialLength = Num,
      randomSerial = "",
      i,
      randomNumber;

    for (i = 0; i < serialLength; i = i + 1) {
      randomNumber = Math.floor(Math.random() * chars.length);
      randomSerial += chars.substring(randomNumber, randomNumber + 1);
    }
    return randomSerial;
  }

  let orderID = "";

  // 訂單成立後要去改票券總數量

  const ChangeQuantity = async () => {
    let selectedDate = document.getElementById("DateYYMMDD").value;
    let selectedSession = document.querySelector(
      "[name=ChooseSession]:checked"
    ).value;
    let url = "http://localhost:2407/Ticket/Cart/ChangeQuantity";
    let total = 0;

    for (let i = 0; i <= selectedTickets.length; i++) {
      console.log(selectedTickets);

      if (selectedTickets[i]) {
        total += selectedTickets[i].count;
      }
      console.log(total);
    }

    let data = {
      date: selectedDate,
      session: selectedSession,
      total: total,
    };

    axios
      .post(url, data)
      .then(function (response) {
        if ((response.status = 200)) {
          console.log("OKKKKKK");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // 結帳
  const PayNow = async (event) => {
    event.preventDefault();
    let isAvailable = await AvailableCheck();

    if (isAvailable) {
      orderID = generateOrderSerial(10);

      await selectedTickets.map((element) => GenerateTickets(element));

      setOrderID(orderID);
      setOrderPass(selectedTickets);
      console.log(OrderID);
      await ChangeQuantity();

      navigate.push("/Ticket/Info");
    } else {
      handleNoTicketShow();
    }
  };

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <Fragment>
      <div className="testpage">
        <div className="bgImg"></div>

        <div className="TicketContainer  container">
          <div className="d-flex justify-content-center p-5">
            <div className="title_ticket">購票 - 選購票券</div>
          </div>

          <div className="d-flex justify-content-center">
            <div className="shoppingSOPbox">
              <div className="bg-warning text-dark shoppingSOP">
                選購
                <br />
                票券
              </div>

              <div className="linebox">
                <div className="line"></div>
              </div>

              <div className="shoppingSOP">
                填寫
                <br />
                資料
              </div>

              <div className="linebox">
                <div className="line"></div>
              </div>

              <div className="shoppingSOP">
                線上
                <br />
                付款
              </div>

              <div className="linebox">
                <div className="line"></div>
              </div>

              <div className="shoppingSOP">
                訂單
                <br />
                確認
              </div>
            </div>
          </div>

          <div className="Cart_date row">
            <div className="col-md-4 col-12 d-flex justify-content-center">
              <div className="">
                <div className="fw-semibold mb-3 text-center Cart_date_title">
                  選擇日期
                </div>

                {DateSelect.length > 0 && (
                  <select
                    name="DateYYMMDD"
                    id="DateYYMMDD"
                    className="form-select"
                    onChange={DATEHandler}
                  >
                    <option value="---請選擇---">---請選擇---</option>

                    {DateSelect.map(function (item, index) {
                      return <DATE key={index} date={item} order={index} />;
                    })}
                  </select>
                )}
              </div>
            </div>

            <SessionButton
              SessionHandler={SessionHandler}
              selectedSessionOption={selectedSessionOption}
              disabledSession={disabledSession}
            ></SessionButton>
          </div>

          {selectedSessionOption === "" ||
          document.getElementById("DateYYMMDD").value ===
            "---請選擇---" ? null : (
            <div>
              <div className="fw-semibold mb-3 text-center Cart_date_title">
                請先勾選票種再選擇數量
              </div>

              {isMobile === true ? null : (
                <div className="border-0">
                  <div className=" d-flex row mx-0 px-3">
                    <div className="col-3 CartListText">票種</div>
                    <div className="col-3 CartListText ps-0">價格</div>
                    <div className="col-3 CartListText pe-0">數量</div>
                    <div className="col-3 CartListText pe-0">小計</div>
                  </div>
                </div>
              )}

              {tickets.map((lists, index) => (
                <TicketType
                  key={lists.id}
                  TicketContent={lists}
                  order={index}
                  AvailableCheck2={AvailableCheck2}
                  disabled={selectedTickets.some(
                    (ticket) => ticket.Label === lists.Label
                  )}
                ></TicketType>
              ))}

              <div className="d-flex my-4 justify-content-center">
                <button
                  className="btn btn-outline-light rounded-0 p-3 btn_Cart"
                  onClick={AddIntoCart}
                >
                  加入購物車
                </button>
              </div>

              <div className="Cart">
                <div className="Cart_date_title">購物車</div>

                <div id="InCartInfo">
                  {selectedTickets.length === 0 ? (
                    <div id="NothingInCart">
                      <div className="admissionTimeBox border-0 mb-0 fs-5">
                        尚未選購任何票券
                      </div>
                    </div>
                  ) : (
                    <div id="SomethingInCart" className="">
                      <div className="admissionTimeBox border-0">
                        <span>入場時間：</span>
                        <span id="Cart_sessionTime">
                         
                          {selectedDATEOption
                          + "   -   " + Whichsession()}
                        </span>
                      </div>

                      {isMobile === true ? null : (
                        <div className="">
                          <div className="d-flex row mx-0 border-0 Ticketincart">
                            <div className="col-2 CartListText px-0">票種</div>
                            <div className="col-3 CartListText ps-0">價格</div>
                            <div className="col-3 CartListText ps-0">數量</div>
                            <div className="col-3 CartListText ps-0">小計</div>
                            <div className="col-1 CartListText"></div>
                          </div>
                        </div>
                      )}

                      <div id="AdultInCart">
                        {selectedTickets.map((ticket, index) => (
                          <SelectedTicketype
                            key={ticket.id}
                            AvailableCheck={AvailableCheck}
                            SelectedTicketContent={ticket}
                            order={index}
                            selectedTickets={selectedTickets}
                            calculateTotalPrice={calculateTotalPrice}
                            setSelectedTickets={setSelectedTickets}
                            Delete={Delete}
                          />
                        ))}
                      </div>
                      <div id="StudentInCart"></div>
                      <div id="KidInCart"></div>
                      <div id="ConcessionInCart"></div>

                      <div className="admissionTimeBox border-0">
                        <span className="">訂單總計：</span>
                        <span className="" id="Cart_OrderPriceAmount">
                          TWD ${totalPrice2 ? totalPrice2 : 0}
                        </span>
                      </div>

                      <div className="d-flex my-4 justify-content-center">
                        <button
                          className="btn_Cart btn btn-outline-warning rounded-0 p-3 "
                          id="CheckOut"
                          onClick={PayNow}
                        >
                          結帳
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <br />
            </div>
          )}
        </div>
      </div>

      <Modal
        show={noTicketshow}
        onHide={handleNoTicketClose}
        className="modalAlert"
      >
        <Modal.Body className="text-center text-dark">
          票券已無所選數量！
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button
            variant="warning"
            onClick={() => setNoTicketShow(false)}
            className="rounded-0"
          >
            確定
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={deleteShow}
        onHide={handleDeleteClose}
        className="modalAlert"
      >
        <Modal.Body className="text-center text-dark">
          已刪除此票券！
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button
            variant="warning"
            onClick={handleDeleteClose}
            className="rounded-0"
          >
            確定
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={somethingWrongShow}
        onHide={handleSomethingWrongClose}
        className="modalAlert rounded-0"
      >
        <Modal.Body className="text-center text-dark">
          發生一些問題，請重新選購！
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button
            variant="warning"
            onClick={handleSomethingWrongClose}
            className="rounded-0"
          >
            確定
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

export default Cart;
