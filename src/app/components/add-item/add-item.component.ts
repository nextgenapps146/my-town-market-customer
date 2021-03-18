import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UtilityService } from 'src/services/utility.service';

@Component({
    selector: 'app-add-item',
    templateUrl: './add-item.component.html',
    styleUrls: ['./add-item.component.scss'],
})

export class AddItemComponent implements OnInit, OnDestroy {
    @Input()
    item: any;

    @Input()
    source: any;

    @Input()
    isCart: boolean;

    @Output()
    addItemEvent: EventEmitter<any> = new EventEmitter();

    @Output()
    updateItemEvent: EventEmitter<any> = new EventEmitter();

    quantity: number;
    qpMap = {};

    storeId: string;

    routerSub: Subscription;
    workingOnItem = false;
    itemWorkingInterval: any;
    showBackdrop = false;

    constructor(public utils: UtilityService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.routerSub = this.route.params.subscribe((params) => {
            this.storeId = params['shop'];
        });
        this.refreshCart();
    }

    refreshCart(): void {
        this.utils.getQPMap().subscribe((val) => {
            this.qpMap = val;
            if (this.qpMap['totalCart'] === undefined) {
                this.qpMap['totalCart'] = [];
            }
            if (this.qpMap['totalQuantity'] === undefined) {
                this.qpMap['totalQuantity'] = 0;
            }
            if (this.qpMap['totalPrice'] === undefined) {
                this.qpMap['totalPrice'] = 0;
            }
            if (this.qpMap[this.item.id] !== undefined) {
                if (this.qpMap[this.item.id].orderQuantity === undefined) {
                    this.qpMap[this.item.id].orderQuantity = 0;
                    this.quantity = 0;
                }
                else {
                    this.quantity = this.qpMap[this.item.id].orderQuantity;
                }
            }
        });
        this.quantity =
            this.qpMap[this.item.id] && this.qpMap[this.item.id].orderQuantity
                ? this.qpMap[this.item.id].orderQuantity
                : 0;
    }

    plusBtnClick(event): void {
        event.stopPropagation();
        clearInterval(this.itemWorkingInterval);
        this.workingOnItem = true;
        this.handleAddItem({ name: 'plus' });
        this.showBackdrop = true;
        // this.clearAddingModal();
    }

    minusBtnClick(event): void {
        event.stopPropagation();
        if (this.quantity > 1) {
            clearInterval(this.itemWorkingInterval);
            this.workingOnItem = true;
            this.handleAddItem({ name: 'minus' });
            this.clearAddingModal();
        } else if (this.quantity === 1) {
            this.deleteBtnClick();
            this.showBackdrop = false;
        }
    }

    deleteBtnClick(): void {
        this.handleAddItem({ name: 'delete' });
        setTimeout(v => {
            this.workingOnItem = false;
        }, 100);
    }

    clearAddingModal(): void {
        this.itemWorkingInterval = setInterval(v => {
            this.workingOnItem = false;
        }, 3000);
    }

    handleAddItem(event): void {
        this.refreshCart();
        switch (event.name) {
            case 'plus':
                this.handlePlus();
                break;
            case 'minus':
                this.handleMinus();
                break;
            case 'delete':
                this.handleDelete();
                break;
        }
        this.utils.setQPMap(this.qpMap);
        if (this.source === 'product') {
            this.addItemEvent.emit(event);
        } else {
            this.updateItemEvent.emit(event);
        }
    }

    handleUpdateItem(item): void {
        this.refreshCart();
    }

    handlePlus(): void {
        if (this.qpMap[this.item.id] === undefined) {
            this.qpMap[this.item.id] = { orderQuantity: 0 };
        }
        this.qpMap[this.item.id].orderQuantity =
            this.qpMap[this.item.id].orderQuantity + 1;
        this.item.orderQuantity = this.qpMap[this.item.id].orderQuantity;
        if (
            this.qpMap['totalCart'].findIndex((x) => x.id === this.item.id) === -1
        ) {
            this.qpMap['totalCart'].push(this.item);
        }
        this.quantity = this.qpMap[this.item.id].orderQuantity;
        this.qpMap['totalQuantity'] = this.qpMap['totalQuantity'] + 1;
        this.qpMap['totalPrice'] = this.qpMap['totalPrice'] + this.item.saleprice;
        const tempIndex = this.qpMap['totalCart'].findIndex(x => x.id === this.item.id);
        this.qpMap['totalCart'][tempIndex].orderQuantity = this.quantity;
    }

    handleMinus(): void {
        const tempIndex = this.qpMap['totalCart'].findIndex(x => x.id === this.item.id);
        if (this.qpMap[this.item.id] === undefined) {
            this.qpMap[this.item.id] = { orderQuantity: 0 };
        }
        this.qpMap[this.item.id].orderQuantity =
            this.qpMap[this.item.id].orderQuantity - 1;
        this.item.orderQuantity = this.qpMap[this.item.id].orderQuantity;
        this.quantity = this.qpMap[this.item.id].orderQuantity;
        this.qpMap['totalQuantity'] = this.qpMap['totalQuantity'] - 1;
        this.qpMap['totalPrice'] = this.qpMap['totalPrice'] - this.item.saleprice;
        this.qpMap['totalCart'][tempIndex].orderQuantity = this.quantity;
    }

    handleDelete(): void {
        delete this.qpMap[this.item.id];
        const index = this.qpMap['totalCart'].findIndex(
            (x) => x.id === this.item.id
        );
        if (index > -1) {
            this.qpMap['totalCart'].splice(index, 1);
        }
        this.quantity = 0;
        this.item.orderQuantity = 0;
        this.qpMap['totalQuantity'] = this.qpMap['totalQuantity'] - 1;
        this.qpMap['totalPrice'] = this.qpMap['totalPrice'] - this.item.saleprice;
    }

    ngOnDestroy(): void {
        this.routerSub.unsubscribe();
    }
}
