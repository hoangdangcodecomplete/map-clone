import { Col, Collapse, List, Row, Typography } from "antd";
import PropTypes from "prop-types";
import React from "react";
import Control from "react-leaflet-control";

const { Panel } = Collapse;

const ListPositionDraw = ({ listPosition, onSetMarkerChecker }) => {
  if (!listPosition || listPosition.length <= 0) return <></>;

  return (
    <Control position="topleft">
      <Row className="control-action list-positions">
        <Collapse accordion className="fomat-collapsed">
          {listPosition.map((layer, i) => (
            <Panel
              key={i}
              header={<div className="title-header">{`Position ${i + 1}`}</div>}
            >
              <List
                bordered
                dataSource={layer.latlngs}
                renderItem={(item, index) => (
                  <List.Item key={index}>
                    <Row justify="space-between">
                      <Col onClick={() => onSetMarkerChecker(item)}>
                        <Typography.Text mark>Something big</Typography.Text>
                      </Col>
                    </Row>
                  </List.Item>
                )}
              />
            </Panel>
          ))}
        </Collapse>
      </Row>
    </Control>
  );
};

ListPositionDraw.propTypes = {
  listPosition: PropTypes.array,
  onSetMarkerChecker: PropTypes.func,
  onUpdateListPosition: PropTypes.func,
};

export default ListPositionDraw;
