import React from "react";
import { Grid } from "semantic-ui-react";
import {
  ReactiveBase,
  SelectedFilters,
  ToggleButton
} from "@appbaseio/reactivesearch";
import { ReactiveMap } from "@appbaseio/reactivemaps";

import "./Main.scss";

export default () => (
  <div className="container">
    <ReactiveBase
      app="helpmap"
      credentials="6Oc2N0Ats:cd4782b5-de89-4675-9a48-e4b5423cd9e2"
      // type="listing"
      theme={{
        colors: {
          primaryColor: "#fff"
        }
      }}
    >
      <ReactiveMap
        componentId="map"
        dataField="location"
        className="right-col"
        defaultZoom={13}
        defaultCenter={{ lat: 49.8397, lng: 24.0297 }} // Lviv
        defaultMapStyle="Blue Essence"
        // pagination
        onPageChange={() => {
          window.scrollTo(0, 0);
        }}
        // onPopoverClick={this.onPopoverClick}
        showMarkerClusters={false}
        showSearchAsMove={true}
        searchAsMove={true}
        // showMapStyles={true}
        unit="km"
        onAllData={(
          hits,
          streamHits,
          loadMore,
          renderMap,
          renderPagination
        ) => (
          <div style={{ display: "flex" }}>
            <div className="card-container">
              <SelectedFilters />
              {hits.map(data => (
                <div key={data._id} className="card">
                  <div
                    className="card__image"
                    style={{ backgroundImage: `url(${data.image})` }}
                    title={data.name}
                  />
                  <div>
                    <h2>{data.name}</h2>
                    {data.types.map((type, i) => (
                      <div key={i} className="card__type">
                        {type}
                      </div>
                    ))}
                    <p className="card__description">{data.description}</p>
                  </div>
                </div>
              ))}
              {/* {renderPagination()} */}
            </div>
            <div className="map-container">{renderMap()}</div>
          </div>
        )}
        // onData={data => ({
        //   label: data.types.map((type, i) => (
        //     <span key={i} style={{ width: 40, display: 'block', textAlign: 'center' }}>
        //       {type}
        //     </span>
        //   )),
        // })}
        react={{
          and: ["GuestSensor", "Types", "search"]
        }}
      />
    </ReactiveBase>
  </div>
);
