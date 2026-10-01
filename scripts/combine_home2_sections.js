const fs = require('fs');

let html = fs.readFileSync('home-2.html', 'utf8');
html = html.replace(/\r\n/g, '\n');

// Replace the split between scholarships and pswp matrix
const oldPart = `    </div>
  </section>

  <!-- NEW SECTION 4: Post-Study Work Permit & PR Conversion Matrix (Distinct Layout & Content) -->
  <section class="section-space-alt" id="pswp-pr-matrix">
    <div class="container">`;

const newPart = `      <hr class="my-5 opacity-25">

      <!-- Post-Study Work Permit & PR Conversion Matrix Sub-Section -->
      <div id="pswp-pr-matrix">`;

if (html.includes(oldPart)) {
  html = html.replace(oldPart, newPart);
  // Also close the extra div before </section>
  const oldClose = `              <td><a href="service-details.html?service=germany-opportunity-card" class="btn btn-sm btn-outline-aura">View Guide</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>`;

  const newClose = `              <td><a href="service-details.html?service=germany-opportunity-card" class="btn btn-sm btn-outline-aura">View Guide</a></td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
    </div>
  </section>`;

  html = html.replace(oldClose, newClose);

  fs.writeFileSync('home-2.html', html, 'utf8');
  console.log('Successfully combined sections in home-2.html!');
} else {
  console.log('Could not find split target in home-2.html');
}
