import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Credit} from "../../models/credit.model";
import {Contract} from "../../models/contract.models";

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private apiUrlGet = 'http://localhost:8024/contracts';
  private apiUrlGetById = 'http://localhost:8024/contracts';
  private apiUrlAdd = 'http://localhost:8024/contracts';
  private apiUrlDelete = 'http://localhost:8024/contracts';
  private apiUrlUpdate = 'http://localhost:8024/contracts';
  constructor(private http: HttpClient) { }
  getAllContract(): Observable<Contract[]> {
    return this.http.get<Contract[]>(this.apiUrlGet);
  }
  addContract(contract: Contract): Observable<Contract> {
    return this.http.post<Contract>(this.apiUrlAdd, contract);
  }

  deleteContract(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlDelete}/${id}`);
  }
  getContractById(id: string): Observable<Contract> {
    return this.http.get<Contract>(`${this.apiUrlGetById}/${id}`);
  }

  updateContract(id: string, contract: Contract): Observable<Contract> {
    return this.http.put<Contract>(`${this.apiUrlUpdate}/${id}`, contract);
  }

}
