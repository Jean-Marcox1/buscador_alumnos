var DATA = [
  {id:'001',nombre:'Quispe Mamani, Sofia',dni:'76543210',grado:'1 Primaria',sec:'A',fecha:'10/01/2026',estado:'Activo'},
  {id:'002',nombre:'Torres Huanca, Diego',dni:'87654321',grado:'2 Primaria',sec:'B',fecha:'11/01/2026',estado:'Activo'},
  {id:'003',nombre:'Ramos Condori, Valeria',dni:'65432109',grado:'3 Primaria',sec:'A',fecha:'12/01/2026',estado:'Pendiente'},
  {id:'004',nombre:'Flores Ccopa, Mateo',dni:'54321098',grado:'4 Primaria',sec:'C',fecha:'13/01/2026',estado:'Activo'},
  {id:'005',nombre:'Garcia Lopez, Juan',dni:'75841236',grado:'3 Primaria',sec:'A',fecha:'14/01/2026',estado:'Activo'},
  {id:'006',nombre:'Mamani Ticona, Lucia',dni:'43210987',grado:'5 Primaria',sec:'B',fecha:'14/01/2026',estado:'Observado'},
  {id:'007',nombre:'Cruz Apaza, Sebastian',dni:'32109876',grado:'6 Primaria',sec:'A',fecha:'15/01/2026',estado:'Activo'},
  {id:'008',nombre:'Vargas Lima, Camila',dni:'21098765',grado:'1 Secundaria',sec:'D',fecha:'15/01/2026',estado:'Pendiente'}
];

var GD = [
  {g:'1P',n:38,c:'#2563eb'},
  {g:'2P',n:42,c:'#7c3aed'},
  {g:'3P',n:35,c:'#db2777'},
  {g:'4P',n:40,c:'#ea580c'},
  {g:'5P',n:37,c:'#16a34a'},
  {g:'6P',n:33,c:'#0891b2'}
];

var CN = {
  matricula: 'Constancia de Matricula',
  estudios: 'Constancia de Estudios',
  notas: 'Constancia de Notas',
  conducta: 'Constancia de Conducta'
};

var CT = 'matricula';

function ir(v) {
  var vistas = document.querySelectorAll('.view');
  for (var i = 0; i < vistas.length; i++) {
    vistas[i].classList.remove('on');
  }
  document.getElementById(v).classList.add('on');
  if (v === 'vhis') { renderT(DATA); }
  if (v === 'vest') { renderG(); }
}

function showOk(id) {
  var e = document.getElementById(id);
  e.classList.add('on');
  setTimeout(function() { e.classList.remove('on'); }, 3500);
}

function renderT(arr) {
  var tb = document.getElementById('tb');
  var h = '';
  if (!arr.length) {
    h = '<tr><td colspan="7" style="text-align:center;padding:24px;color:#6b7280">Sin resultados.</td></tr>';
  } else {
    for (var i = 0; i < arr.length; i++) {
      var r = arr[i];
      var cl = r.estado === 'Activo' ? 'tg' : (r.estado === 'Pendiente' ? 'to' : 'tb');
      h += '<tr>';
      h += '<td>' + r.id + '</td>';
      h += '<td style="font-weight:700">' + r.nombre + '</td>';
      h += '<td>' + r.dni + '</td>';
      h += '<td>' + r.grado + '</td>';
      h += '<td>' + r.sec + '</td>';
      h += '<td>' + r.fecha + '</td>';
      h += '<td><span class="tag ' + cl + '">' + r.estado + '</span></td>';
      h += '</tr>';
    }
  }
  tb.innerHTML = h;
}

function renderG() {
  var max = 0;
  for (var i = 0; i < GD.length; i++) {
    if (GD[i].n > max) { max = GD[i].n; }
  }
  var bh = '';
  var lh = '';
  for (var i = 0; i < GD.length; i++) {
    var d = GD[i];
    var h = Math.round((d.n / max) * 120);
    bh += '<div class="bw"><span class="bv">' + d.n + '</span><div class="bar" style="height:' + h + 'px;background:' + d.c + '"></div></div>';
    lh += '<span class="lb">' + d.g + '</span>';
  }
  document.getElementById('cbars').innerHTML = bh;
  document.getElementById('clbs').innerHTML = lh;
}

window.onload = function() {
  document.getElementById('b1').onclick = function() { ir('vreg'); };
  document.getElementById('b2').onclick = function() { ir('vact'); };
  document.getElementById('b3').onclick = function() { ir('vhis'); };
  document.getElementById('b4').onclick = function() { ir('vimp'); };
  document.getElementById('b5').onclick = function() { ir('vest'); };
  document.getElementById('bk1').onclick = function() { ir('vhome'); };
  document.getElementById('bk2').onclick = function() { ir('vhome'); };
  document.getElementById('bk3').onclick = function() { ir('vhome'); };
  document.getElementById('bk4').onclick = function() { ir('vhome'); };
  document.getElementById('bk5').onclick = function() { ir('vhome'); };

  document.getElementById('bgreg').onclick = function() {
    var a = document.getElementById('rap').value.trim();
    var b = document.getElementById('rnm').value.trim();
    var c = document.getElementById('rdni').value.trim();
    var d = document.getElementById('rgr').value;
    if (!a || !b || !c || !d) {
      alert('Completa: Apellidos, Nombres, DNI y Grado.');
      return;
    }
    showOk('ok1');
    var campos = ['rap','rnm','rdni','rfn','rap2','rtel','rdir','robs'];
    for (var i = 0; i < campos.length; i++) {
      document.getElementById(campos[i]).value = '';
    }
    document.getElementById('rgr').value = '';
    document.getElementById('rsc').value = '';
  };

  document.getElementById('bbq').onclick = function() {
    var q = document.getElementById('bq').value.trim();
    if (!q) { alert('Ingresa un DNI o apellido.'); return; }
    document.getElementById('res').style.display = 'block';
  };

  document.getElementById('bgact').onclick = function() {
    showOk('ok2');
  };

  document.getElementById('ftxt').oninput = function() {
    var q = this.value.toLowerCase();
    var e = document.getElementById('fest').value;
    var res = [];
    for (var i = 0; i < DATA.length; i++) {
      var r = DATA[i];
      var mq = !q || r.nombre.toLowerCase().indexOf(q) > -1 || r.dni.indexOf(q) > -1;
      var me = !e || r.estado === e;
      if (mq && me) { res.push(r); }
    }
    renderT(res);
  };

  document.getElementById('fest').onchange = function() {
    var q = document.getElementById('ftxt').value.toLowerCase();
    var e = this.value;
    var res = [];
    for (var i = 0; i < DATA.length; i++) {
      var r = DATA[i];
      var mq = !q || r.nombre.toLowerCase().indexOf(q) > -1 || r.dni.indexOf(q) > -1;
      var me = !e || r.estado === e;
      if (mq && me) { res.push(r); }
    }
    renderT(res);
  };

  var tarjetas = document.querySelectorAll('.tc');
  for (var i = 0; i < tarjetas.length; i++) {
    tarjetas[i].onclick = function() {
      for (var j = 0; j < tarjetas.length; j++) { tarjetas[j].classList.remove('sel'); }
      this.classList.add('sel');
      CT = this.getAttribute('data-tipo');
    };
  }

  document.getElementById('bgen').onclick = function() {
    var dni = document.getElementById('pdni').value.trim();
    if (!dni) { alert('Ingresa el DNI del estudiante.'); return; }
    var est = null;
    for (var i = 0; i < DATA.length; i++) {
      if (DATA[i].dni === dni) { est = DATA[i]; break; }
    }
    if (!est) { est = {nombre:'Estudiante Registrado', grado:'3 Primaria', sec:'A'}; }
    var meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
    var hoy = new Date();
    var fecha = hoy.getDate() + ' de ' + meses[hoy.getMonth()] + ' de ' + hoy.getFullYear();
    var nombre = CN[CT];
    var html = '<div style="border:2px solid #1a2340;border-radius:9px;padding:28px;max-width:460px;margin:0 auto;text-align:left;background:white;font-family:Arial,sans-serif">';
    html += '<div style="text-align:center;margin-bottom:16px">';
    html += '<div style="font-size:28px">&#x1F3EB;</div>';
    html += '<p style="font-size:16px;font-weight:700;color:#1a2340;margin:6px 0 2px">Institucion Educativa Nacional</p>';
    html += '<p style="font-size:11px;color:#6b7280">Ano Escolar 2026</p>';
    html += '<hr style="margin:10px 0;border:none;border-top:1px solid #dde3f0">';
    html += '<p style="font-size:12px;font-weight:700;color:#2563eb;letter-spacing:.8px;text-transform:uppercase">' + nombre + '</p>';
    html += '</div>';
    html += '<p style="font-size:13px;line-height:1.9;color:#374151">La direccion hace constar que el estudiante <strong>' + est.nombre + '</strong>, con DNI <strong>' + dni + '</strong>, se encuentra matriculado en <strong>' + est.grado + ' - Seccion ' + est.sec + '</strong> del ano escolar 2026.</p>';
    html += '<p style="font-size:11px;color:#6b7280;margin-top:16px;text-align:right">Lima, ' + fecha + '</p>';
    html += '</div>';
    document.getElementById('pbox').innerHTML = html;
  };

  document.getElementById('bimp').onclick = function() {
    var c = document.getElementById('pbox').innerHTML;
    if (c.indexOf('Institucion') < 0) { alert('Primero genera la vista previa.'); return; }
    var w = window.open('', '_blank');
    if (w) {
      w.document.write('<!DOCTYPE html><html><head><title>Constancia</title><style>body{font-family:Arial,sans-serif;padding:40px}</style></head><body>' + c + '</body></html>');
      w.document.close();
      setTimeout(function() { w.print(); }, 600);
    }
  };
};
