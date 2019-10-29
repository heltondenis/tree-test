import { NodeService } from './../_services/node.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeNode, TreeModel, ITreeOptions } from 'angular-tree-component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {

  options = {
    useCheckbox: false,
    allowDrop: true,
    allowDragoverStyling: false
  };

  /** could have a service serving the data but I added it statically */
  nodes = [
    {
      name: 'Electronics',
      children: [
        { name: 'Calculators', description: 'Calculators' },
        { name: 'HD media player' },
        { name: 'Drone' }
      ]
    },
    {
      name: 'Computers',
      children: [
        { name: 'Printers' },
        { name: 'Monitors' },
        { name: 'Gamer Notebook' },
        { name: 'Servers' },
      ]
    },
    {
      name: 'Hardware',
      children: [
        { name: 'Coolers' },
        { name: 'Modem' },
        { name: 'Streamer' },
        { name: 'Drives' },
        { name: 'RAM memory' }
      ]
    }
  ];

  registerForm: FormGroup;
  editForm: FormGroup;
  submitted = false;

  /** Dialogs properties */
  displayRegister: Boolean = false;
  displayEdit: Boolean = false;

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      node: [0, Validators.required]
    });

    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      id: [, Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  /** Submits */
  onSubmitRegister(tree: any) {
    if (this.registerForm.value.name === '') {
      alert('Vazio');
    } else {
      this.submitted = true;
      this.nodes[this.registerForm.value.node].children.push({
        name: this.registerForm.value.name
      });
      tree.treeModel.update();
      this.displayRegister = false;
    }
  }

  onSubmitEdit(treeModel: any) {
    if (treeModel.activeNodes.length === 0) {
      alert('Click on the item');
    }
    this.submitted = true;
    treeModel.activeNodes[0].data.name = this.editForm.value.name;
    treeModel.update();
    this.displayEdit = false;
  }

  /** Dialogs */
  openRegisterDialog() {
    this.displayRegister = true;
  }

  openEditDialog() {
    this.displayEdit = true;
  }

  /** Functions */
  removeNode(treeModel: any) {
    if (treeModel.activeNodes.length === 0) {
      alert('Click on the item');
    } else {
      _.remove(this.nodes, (e) => {
        return e.id === treeModel.activeNodes[0].data.id;
      });

      // Remove children
      this.nodes.forEach((element) => {
        _.remove(element.children, (e) => {
          return e.id === treeModel.activeNodes[0].data.id;
        });
      });
      treeModel.update();
    }
  }

  filterFn(value: string, treeModel: TreeModel) {
    treeModel.filterNodes((node: TreeNode) => fuzzysearch(value, node.data.name));
  }
}

function fuzzysearch(needle: string, haystack: string) {
  const haystackLC = haystack.toLowerCase();
  const needleLC = needle.toLowerCase();

  const hlen = haystack.length;
  const nlen = needleLC.length;

  if (nlen > hlen) {
    return false;
  }
  if (nlen === hlen) {
    return needleLC === haystackLC;
  }
  outer: for (let i = 0, j = 0; i < nlen; i++) {
    const nch = needleLC.charCodeAt(i);

    while (j < hlen) {
      if (haystackLC.charCodeAt(j++) === nch) {
        continue outer;
      }
    }
    return false;
  }
  return true;
}

