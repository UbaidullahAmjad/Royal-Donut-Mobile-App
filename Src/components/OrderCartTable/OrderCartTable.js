import React, { useEffect, useState } from "react";
import { ActivityIndicator, Modal, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { DataTable, RadioButton } from 'react-native-paper';
import { connect } from 'react-redux';
import LocalizationContext from '../../../LocalizationContext';
import { confirmOrder, getDateofCart, hideCOnfirmDateModal, modifyCart } from "../../Store/Actions/cartAction";
import Table from "../Table/Table";



const OrderCartTable = (props) => {
  const { t, locale } = React.useContext(LocalizationContext);
  const [ModalVisible, setHideModal] = useState(false)
  const [value, setValue] = useState('');
  const [msg, setmsg] = useState('')
  const [total, settotal] = useState(0)
  const [confirmCartProduct, setconfirmCartProduct] = useState([])

  useEffect(() => {
    var total = 0
    for (let i = 0; i < props.item.product.length; i++) {
      total = (props.item.product[i].quantity * props.item.product[i].price_per_package) + total

    }
    settotal(total)

  }, [props.item])



  return (
    <View
      style={{
        elevation: 2,
        backgroundColor: "#fff",
        margin: 5,
        borderRadius: 4,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <View>
          <Text style={{ fontSize: 14, fontWeight: "700" }}>{props?.item?.sname}</Text>
        </View>
        <View style={{ width: "40%", flexDirection: "row-reverse" }}>
          {locale == "en" ? (
            <Text style={{ fontSize: 16, fontWeight: "700" }}>{t('Total') + ":"} {(total).toFixed(2).replace(/(\.0+|0+)$/, '')}€</Text>
          ) :
            <Text style={{ fontSize: 16, fontWeight: "700" }}>{t('Total') + ":"} {(total).toFixed(2).replace(".", ",").replace(/(\,0+|0+)$/, '')}€</Text>
          }
          {/* <Text style={{ fontSize: 16, fontWeight: "700" }}>{t('Total')}: {total}€</Text> */}

        </View>
      </View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title numberOfLines={3} style={{ flex: 3, }}>
            {t('Product Name')}
          </DataTable.Title>
          <DataTable.Title style={{ flex: 1.3, justifyContent: "center" }}>{t('Unit')}</DataTable.Title>
          <DataTable.Title numeric style={{ flex: 1.5, justifyContent: "flex-end", }}>
            {t('Price')}
          </DataTable.Title>
          <DataTable.Title numeric>R</DataTable.Title>
          {props?.item?.min_req_qty == 1 ? (
            <DataTable.Title numeric>M</DataTable.Title>
          ) : null}

          <DataTable.Title numeric></DataTable.Title>
        </DataTable.Header>
      </DataTable>

      {props.item.product.map((item, index) => {
        return (
          <Table key={index} action="show" item={item} sid={props?.item?.sid} min_req_qty={props?.item?.min_req_qty} />
        )
      })}
      <View style={{ paddingHorizontal: 12, paddingVertical: 12 }}>

        <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
          {Object.keys(props.cart?.cartDateData).length != 0 ? (
            <View>
              <Text style={{ fontSize: 14, fontWeight: "700", marginBottom: 6 }}>{t('Select a Day of Delievery')}</Text>
              {props.cart?.cartDateData?.delivery_dates.map((item, index) => {
                return (
                  <View key={index}>
                    <View style={{ flexDirection: 'row' }}>
                      <RadioButton value={item} />
                      <View style={{ justifyContent: "center" }}>
                        <Text>{item}</Text>
                      </View>
                    </View>
                  </View>
                )
              })}
            </View>
          ) :
            <Text style={{ fontSize: 14, fontWeight: "700", marginBottom: 6 }}>{t('no supplier associated rule found')}</Text>
          }

        </RadioButton.Group>
      </View>
      {/* <View style={{ flexDirection: 'row-reverse' }}>


        <TouchableOpacity
          onPress={() => props.navigation.navigate('ModifyCart', {
            product: props?.item
          })}

        >
          <View
            style={{
              padding: 10,
              marginRight: 5,
              backgroundColor: "#ccc",
              borderRadius: 6,
              marginTop: 8,
            }}
          >
            <Text style={{ color: "#000" }}>{t('Modify')}</Text>
          </View>
        </TouchableOpacity>
      </View> */}

      {props?.item?.length != 0 ? (
        <TouchableHighlight
          onPress={() => {
            props.confirmOrder(
              props.navigation,
              value,
              '',
              props?.item,
              total,
              t('Something Went Wrong! Kindly try again later'),
              t('Order Confirm Successfully'),
              t('successfull'),
              t('Select a Day of Delievery'),
              t('Kindly Check your Internet Connection'),
              change = () => setHideModal(false))

          }}
          style={{
            padding: 10,
            backgroundColor: "#198754",

            marginTop: 16
          }}
        >
          {props.shared.btnLoader ? (
            <ActivityIndicator size="small" color="#fff" />
          ) :
            <Text style={{ color: "#fff", textAlign: "center" }}>{t('confirm your order')}</Text>
          }

        </TouchableHighlight>
      ) : null}
    </View >
  );
};

const mapStateToProps = (state, ownProps) => ({
  cart: state.cart,
  shared: state.shared,
  item: ownProps.item,
  pricingDetail: ownProps.pricingDetail,
  navigation: ownProps.navigation
})

export default connect(mapStateToProps, {
  hideCOnfirmDateModal,
  confirmOrder,
  modifyCart,
  getDateofCart
})(OrderCartTable)

