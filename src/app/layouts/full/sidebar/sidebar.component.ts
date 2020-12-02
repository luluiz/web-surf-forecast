import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MenuItems } from '../../../shared/menu-items/menu-items';
@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: []
})
export class AppSidebarComponent implements OnDestroy {
    public config: PerfectScrollbarConfigInterface = {};
    public mobileQuery: MediaQueryList;
    private _mobileQueryListener: () => void;

    constructor(
        public changeDetectorRef: ChangeDetectorRef,
        public media: MediaMatcher,
        public menuItems: MenuItems,
        public router: Router
    ) {
        this.mobileQuery = media.matchMedia('(min-width: 768px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    goTo(item: string, subitem?: string): void {
        if (item.includes('/') && !subitem) {
            let splitter = item.split('/');
            item = splitter[0];
            subitem = splitter[1];
        }

        let endereco = ['/'];
        endereco.push(item);

        if (subitem) endereco.push(subitem);
        this.router.navigate(endereco);
    }
}
