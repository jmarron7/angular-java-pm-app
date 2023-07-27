import { Component, OnInit } from '@angular/core';
import { CompanyDto } from '../../services/general.service';
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
    if (user) this.companies = user.companies;
  }

  setCompany(selectedCompanyId: any) {
    if (selectedCompanyId.length === 0) this.selectedCompanyId = 0;
    else this.selectedCompanyId = selectedCompanyId;
    localStorage.setItem('companyId', selectedCompanyId);
    this.companies.forEach((c) => {
      if (c.id == this.selectedCompanyId)
        localStorage.setItem('companyName', c.name);
    });
  }

  nextPage() {
    this.router.navigateByUrl('');
  }
}
