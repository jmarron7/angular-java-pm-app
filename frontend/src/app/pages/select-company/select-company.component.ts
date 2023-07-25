import { Component, OnInit } from '@angular/core';
import { CompanyDto, GeneralService } from '../../services/general.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-company',
  templateUrl: './select-company.component.html',
  styleUrls: ['./select-company.component.css'],
})
export class SelectCompanyComponent implements OnInit {
  companies: CompanyDto[] = [];
  selectedCompanyId: number = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies() {
    let user = JSON.parse(localStorage.getItem('user')!);
    if (user) {
      this.companies = user.companies;
    }
  }

  nextPage() {
    alert(this.selectedCompanyId);
    localStorage.setItem('companyId', String(this.selectedCompanyId));
    this.router.navigateByUrl('');
  }
}
