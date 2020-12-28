/*
 * Created with Visual Studio Code.
 * github: https://github.com/react-xui/x-paging
 * User: 田想兵
 * Date: 2018-11-29
 * Time: 20:00:00
 * Contact: 55342775@qq.com
 */
import React, { Component } from "react";
import { PosInterInput } from "jsx-input";
import I18n from 'x-i18n';
import local from '../local/zh_CN';
import PropTypes from "prop-types";
export default class Paging extends Component {

    static propTypes = {
        current: PropTypes.number.isRequired,
        pagesize: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
        pageSizeOptions: PropTypes.array
    };
    static defaultProps = {
        current: 1,
        pagesize: 10,
        total: 0,
        pageSizeOptions: [],
    };
    constructor(props) {
        super(props);
        let current = props.current || 1;
        this.state = Object.assign({ current }, this.compute(props, current));
        this.onChangeHandle = this.onChangeHandle.bind(this);
        this.goFirst = this.goFirst.bind(this);
        this.goNext = this.goNext.bind(this);
        this.goPrev = this.goPrev.bind(this);
        this.goLast = this.goLast.bind(this);
        this.onKeyup = this.onKeyup.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.renderPageSize = this.renderPageSize.bind(this);
        this.changePageSize = this.changePageSize.bind(this);
        this.pager = React.createRef();
    }
    compute(props, curr) {
        let current = curr || this.state.current;
        let sumPage = props.total % props.pagesize === 0 ? parseInt(props.total / props.pagesize, 0) : parseInt(props.total / props.pagesize + 1, 0);
        current = Math.min(sumPage,current)||1;
        this.obj = {
            sumPage,
            pagesize: props.pagesize || 1,
            total: props.total
        };
        return { current,isFirst: current <= 1, isLast: current >= this.obj.sumPage, ...this.obj };
    }
    reComputeState() {
        let state = this.compute(this.state);
        this.setState({ ...state }, () => {
            this.props.callback && this.props.callback(this.state.current,this.state.pagesize)
        });
    }
    onChangeHandle(e) {
    }
    componentWillReceiveProps(newProps, newState) {
        if (newProps && (newProps.pagesize !== this.state.pagesize || newProps.total !== this.state.total || newProps.current !== this.state.current)) {
            let state = this.compute(newProps);
            this.setState({ ...state });
        }
    }
    goFirst() {
        if (this.state.current !== 1) {
            this.setState({ current: 1 }, () => {
                this.reComputeState();
            });
        }
    }
    goPrev() {
        if (this.state.current > 1) {
            this.setState({ current: +this.state.current - 1 }, () => {
                this.reComputeState();
            });
        }
    }
    goNext() {
        if (!this.state.isLast) {
            this.setState({ current: +this.state.current + 1 }, () => {
                this.reComputeState();
            });
        }
    }
    onBlur() {
        this.setState({ current: +this.state.current });
    }
    goLast() {
        if (!this.state.isLast) {
            this.setState({ current: this.state.sumPage }, () => {
                this.reComputeState();
            });
        }
    }
    onKeyup(e) {
        if (e.keyCode === 13) {
            if (this.state.sumPage < e.target.value || e.target.value < 1) {
                this.setState({ current: +this.state.current });
                // e.target.value = this.state.current;
            } else {
                this.setState({ current: parseInt(e.target.value, 0) }, () => {
                    this.reComputeState();
                });
            }
        }
    }
    renderPageSize() {
        let { pageSizeOptions } = this.props;
        if (pageSizeOptions.length > 0) {
            let options = pageSizeOptions.map(item => <option key={item} value={item}>{item}</option>)
            return (
                <select  title={local.recordPage}  value={this.state.pagesize} onChange={this.changePageSize}>{options}</select>
            )
        }
    }
    changePageSize(e) {
        let pagesize = Number(e.target.value);
        this.setState({pagesize},()=>{
            this.reComputeState();
        })
    }
    renderContent = (local, localCode) => {
        let obj = this.state;
        return (
            <div className="x-paging" ref={ref=>this.pager=ref}>
                <button title={local.first} onClick={this.goFirst} className={this.state.isFirst ? 'disabled' : ''}><i className="xui icon-last" /></button>
                <button title={local.prev} onClick={this.goPrev} className={this.state.isFirst ? 'disabled' : ''}><i className="xui icon-last1" /></button>
                <span>
                    {local.go}<PosInterInput onChange={this.onChangeHandle} onBlur={this.onBlur} onKeyUp={this.onKeyup} value={this.state.current} placeholder={local.pageNum} />{local.page}
                    <span className="sum">{local.sum}{obj.sumPage}{local.page}</span>
                </span>
                <button title={local.next} onClick={this.goNext} className={this.state.isLast ? 'disabled' : ''}><i className="xui icon-next" /></button>
                <button title={local.last} onClick={this.goLast} className={this.state.isLast ? 'disabled' : ''}><i className="xui icon-next1" /></button>
                {this.renderPageSize()}
            </div>
        )
    }
    componentDidMount(){
        //绑定一个跳转至第一页的dom事件
        // let event= new CEvent('goFirst');
        this.pager.addEventListener('goFirst',this.goFirst,false);
    }
    componentWillUnmount(){
        this.pager.removeEventListener('goFirst',this.goFirst,false);
    }
    render() {
        let defaultValue = {};
        let localData = this.props.local;
        defaultValue = {
            ...local,
            ...localData
        };
        return (
            <I18n componentName="Paging" defaultValue={defaultValue} >
                {this.renderContent}
            </I18n>
        )

    }
} 