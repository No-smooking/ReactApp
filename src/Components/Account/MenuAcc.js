import { Link } from "react-router-dom";

function MenuAcc(props) { 
    return (
        <div className="col-sm-3">
            <div className="left-sidebar">
                <h2>Account</h2>
                <div className="panel-group category-products" id="accordian">{/*category-productsr*/}
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <h4 className="panel-title">
                        <Link to='account/update' data-toggle="collapse" data-parent="#accordian">
                          <span className="badge pull-right"><i className="fa fa-plus" /></span>
                          Account
                        </Link>
                      </h4>
                    </div>
                  </div>
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <h4 className="panel-title">
                        <Link to='account/my_product' data-toggle="collapse" data-parent="#accordian">
                          <span className="badge pull-right"><i className="fa fa-plus" /></span>
                          My product
                        </Link>
                      </h4>
                    </div>
                  </div>
                </div>
            </div>
        </div>
    )
}
export default MenuAcc;