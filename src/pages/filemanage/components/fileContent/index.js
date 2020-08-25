import React from 'react';
import {Input, Button, Table, Modal, Upload, message, Radio, Form} from 'antd'
import { connect } from 'dva';
import styles from './index.css'
import icon from '../../statics/iconfont/iconfont.css'

function FileContent(props){
  const columns = props.columns;
  const data = props.data;

  return (
    <div className={styles.Wrapper}>
      {/*搜索*/}
      <div className={styles.Title}>
        <Input id={styles.SearchInput}/>
        <Button type={"primary"} className={styles.SearchBtn}>
          <span className={icon.iconfont} style={{marginTop:"-2px",fontSize: "23px"}}>&#xe60c;</span>
        </Button>
        <a className={styles.More}><span className={icon.iconfont} style={{fontSize: "28px"}}>&#xe7ac;</span></a>
      </div>
      {/*表格*/}
      <div className={styles.Content}>
        <div style={{verticalAlign: "middle",height: "40px"}}>
          <div className={styles.FolderName}>{props.path}</div>
          <Button type={'primary'} className={styles.UploadBtn} onClick={() => {props.dispatch({type: 'uploadModal/changeVisible',payload: {visible: true}})}}>上传</Button>
          {/*模态框*/}
          <Modal
            title="FILE UPLOADER"
            visible={props.visible}
            className={styles.UploadModal}
            onCancel={
              () => {
                props.dispatch({
                  type: 'uploadModal/changeVisible',
                  payload: {
                    visible: false
                  }
                })
              }
            }
          >
            <Upload
              name="file"
              multiple={true}
              action={props.uploadurl}
              onChange={
                (info) => {
                  const { status } = info.file;
                  if (status !== 'uploading') {
                    console.log(info.file, info.fileList);
                  }
                  if (status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully.`);
                  } else if (status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                  }
                }
              }
            >
              <div className={styles.AddFile}>
                click here or drop file here
              </div>
            </Upload>
            <Radio.Group value={props.radiovalue} style={{ marginTop: "20px",marginLeft: "120px" }} onChange={
              (e) => {
                props.dispatch({
                  type: 'uploadModal/changeRadio',
                  payload: {
                    radiovalue: e.target.value
                  }
                })
              }
            }>
              <Radio value={1}>UnKeepName</Radio>
              <Radio value={2}>KeepName</Radio>
            </Radio.Group>
            <br/>
            <div className={styles.UploadPath}>
              <Form>
                <Form.Item
                  label="Path"
                  name="username"
                  rules={[{ required: true, message: 'Please input your username!' }]}
                  key={props.path}
                  initialValue={props.path}
                >
                  <Input style={{width: "350px"}} value={props.path}/>
                </Form.Item>
              </Form>

            </div>




          </Modal>
        </div>
        <Table columns={columns} dataSource={data} pagination={{position: ['bottomCenter']}}/>
      </div>
    </div>
  )
}

function mapStateToProps({ tableContent,uploadModal  }){
  return {
    columns: tableContent.columns,
    data: tableContent.data,
    path: tableContent.path,
    uploadurl: tableContent.uploadurl,
    radiovalue: uploadModal.radiovalue,
    visible: uploadModal.visible
  }
}

export default connect(mapStateToProps)(FileContent);