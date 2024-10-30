import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [NzLayoutModule,
    NzDrawerModule,
    FormsModule,
    NzCheckboxModule,
    NzTagModule,
    CommonModule,
    NzIconModule,],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent implements OnInit, OnChanges {
  @Input() sectionData:any;
  visible = false;
  allChecked = false;
  isActive = false;
  indeterminate = false;
  filteredOption = new Set();
  constructor(){}
  checkOptionsOne: { label:string; value: string; checked: boolean }[] = [];
  ngOnInit(): void {
    if (this.sectionData) {
      this.initializeCheckOptions();
    }
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sectionData'] && this.sectionData) {
      this.initializeCheckOptions(); // Update options if sectionData changes
    }
  }

  initializeCheckOptions(): void {
    this.checkOptionsOne = this.sectionData!.sections.map((section:any) => ({
      label: section.title,
      value: section.title,
      checked: false,
    }));
  }
  // checkOptionsOne = [
  //   { label: 'Emerging Markets', value: 'Emerging Markets', checked: false },
  //   { label: 'Oncology', value: 'Oncology', checked: false },
  //   {
  //     label: 'Respiratory/Immunology',
  //     value: 'Respiratory/Immunology',
  //     checked: false,
  //   },
  //   { label: 'Vaccinations', value: 'Vaccinations', checked: false },
  // ];

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
  updateAllChecked(): void {
    this.indeterminate = false;
    if (this.allChecked) {
      this.checkOptionsOne = this.checkOptionsOne.map((item) => ({
        ...item,
        checked: true,
      }));
      this.checkOptionsOne.forEach((item) => {
        if (item.checked) {
          this.filteredOption.add(item.value);
        }
      });
    } else {
      this.checkOptionsOne = this.checkOptionsOne.map((item) => ({
        ...item,
        checked: false,
      }));
      this.checkOptionsOne.forEach((item) => {
        if (this.filteredOption.has(item.value)) {
          this.filteredOption.delete(item.value);
        }
      });
    }
    this.checkOptionsOne.forEach((item) => {
      if (item.checked) {
        this.filteredOption.add(item.value);
      }
    });
    console.log(this.filteredOption);
    this.updateIsActive();
  }

  updateSingleChecked(): void {
    if (this.checkOptionsOne.every((item) => !item.checked)) {
      this.allChecked = false;
      this.indeterminate = false;
    } else if (this.checkOptionsOne.every((item) => item.checked)) {
      this.allChecked = true;
      this.indeterminate = false;
    } else {
      this.indeterminate = true;
    }
    this.checkOptionsOne.forEach((item) => {
      if (item.checked) {
        this.filteredOption.add(item.value);
      } else if (!item.checked) {
        this.filteredOption.delete(item.value);
      }
    });
    console.log(this.filteredOption);
    this.updateIsActive();
  }
  onClose(event: any, index: any) {
    this.checkOptionsOne[index].checked = false;
    this.allChecked = false;
    this.filteredOption.delete(this.checkOptionsOne[index].value);
    console.log(this.filteredOption);
    this.updateIsActive();
  }
  updateIsActive(): void {
    this.isActive = this.checkOptionsOne.some((item) => item.checked);
    console.log(this.isActive);
  }
}
