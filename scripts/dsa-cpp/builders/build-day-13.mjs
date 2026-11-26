// Build day-13 (Hashing / STL Associative Containers) complete standalone programs.
import { readFileSync, writeFileSync } from "node:fs";

const SRC = "/home/z/tmp/dsa-export/dsa-cpp/day-13.code.json";
const DST = "/home/z/my-project/scripts/dsa-cpp/data/day-13.code.json";

const data = JSON.parse(readFileSync(SRC, "utf8"));

const readN = `int n;
    if (!(std::cin >> n)) return 0;
    std::vector<int> v(n);
    for (int i = 0; i < n; i++) std::cin >> v[i];`;

const programs = {
  "Frequency of the Target": `#include <iostream>
#include <vector>
#include <unordered_map>

int frequency_of(std::vector<int> v, int target) {
    std::unordered_map<int, int> freq;
    for (size_t i = 0; i < v.size(); i++) freq[v[i]]++;
    if (freq.count(target)) return freq[target];
    return 0;
}

int main() {
    ${readN}
    int target;
    std::cin >> target;
    std::cout << frequency_of(v, target) << std::endl;
    return 0;
}`,

  "Count Distinct Values": `#include <iostream>
#include <vector>
#include <unordered_set>

int distinct_count(std::vector<int> v) {
    std::unordered_set<int> seen;
    for (size_t i = 0; i < v.size(); i++) seen.insert(v[i]);
    return (int)seen.size();
}

int main() {
    ${readN}
    std::cout << distinct_count(v) << std::endl;
    return 0;
}`,

  "First Duplicate Value": `#include <iostream>
#include <vector>
#include <unordered_set>

int first_duplicate(std::vector<int> v) {
    std::unordered_set<int> seen;
    for (size_t i = 0; i < v.size(); i++) {
        if (seen.count(v[i])) return v[i];
        seen.insert(v[i]);
    }
    return -1;
}

int main() {
    ${readN}
    std::cout << first_duplicate(v) << std::endl;
    return 0;
}`,

  "Character Count in a Word": `#include <iostream>
#include <string>
#include <map>

int char_count(std::string s, char c) {
    std::map<char, int> freq;
    for (size_t i = 0; i < s.size(); i++) freq[s[i]]++;
    if (freq.count(c)) return freq[c];
    return 0;
}

int main() {
    std::string s;
    char c;
    std::cin >> s >> c;
    std::cout << char_count(s, c) << std::endl;
    return 0;
}`,

  "Check Anagram Pair": `#include <iostream>
#include <string>
#include <map>

int is_anagram(std::string a, std::string b) {
    if (a.size() != b.size()) return 0;
    std::map<char, int> diff;
    for (size_t i = 0; i < a.size(); i++) diff[a[i]]++;
    for (size_t i = 0; i < b.size(); i++) diff[b[i]]--;
    for (auto &kv : diff)
        if (kv.second != 0) return 0;
    return 1;
}

int main() {
    std::string a, b;
    std::cin >> a >> b;
    std::cout << is_anagram(a, b) << std::endl;
    return 0;
}`,

  "Sum of Unique Values": `#include <iostream>
#include <vector>
#include <unordered_map>

long long sum_unique(std::vector<int> v) {
    std::unordered_map<int, int> freq;
    for (size_t i = 0; i < v.size(); i++) freq[v[i]]++;
    long long total = 0;
    for (auto &kv : freq)
        if (kv.second == 1) total += kv.first;
    return total;
}

int main() {
    ${readN}
    std::cout << sum_unique(v) << std::endl;
    return 0;
}`,

  "Most Frequent Warehouse Code": `#include <iostream>
#include <vector>
#include <unordered_map>

int most_frequent(std::vector<int> v) {
    std::unordered_map<int, int> freq;
    for (size_t i = 0; i < v.size(); i++) freq[v[i]]++;
    int best_val = 0;
    int best_cnt = -1;
    for (auto &kv : freq) {
        if (kv.second > best_cnt || (kv.second == best_cnt && kv.first < best_val)) {
            best_cnt = kv.second;
            best_val = kv.first;
        }
    }
    return best_val;
}

int main() {
    ${readN}
    std::cout << most_frequent(v) << std::endl;
    return 0;
}`,

  "Warehouse Stock Lookup": `#include <iostream>
#include <vector>
#include <unordered_map>

std::vector<int> stock_lookup(std::vector<int> ids, std::vector<int> qtys, std::vector<int> queries) {
    std::unordered_map<int, int> stock;
    for (size_t i = 0; i < ids.size(); i++) stock[ids[i]] = qtys[i];
    std::vector<int> out;
    for (size_t i = 0; i < queries.size(); i++) {
        if (stock.count(queries[i])) out.push_back(stock[queries[i]]);
        else out.push_back(-1);
    }
    return out;
}

int main() {
    int n;
    if (!(std::cin >> n)) return 0;
    std::vector<int> ids(n);
    for (int i = 0; i < n; i++) std::cin >> ids[i];
    int m;
    std::cin >> m;
    std::vector<int> qtys(m);
    for (int i = 0; i < m; i++) std::cin >> qtys[i];
    int q;
    std::cin >> q;
    std::vector<int> queries(q);
    for (int i = 0; i < q; i++) std::cin >> queries[i];
    std::vector<int> res = stock_lookup(ids, qtys, queries);
    for (size_t i = 0; i < res.size(); i++) {
        if (i) std::cout << ' ';
        std::cout << res[i];
    }
    std::cout << std::endl;
    return 0;
}`,

  "Guest List Membership": `#include <iostream>
#include <vector>
#include <string>
#include <set>

std::vector<int> guest_check(std::vector<std::string> guests, std::vector<std::string> queries) {
    std::set<std::string> invited;
    for (size_t i = 0; i < guests.size(); i++) invited.insert(guests[i]);
    std::vector<int> out;
    for (size_t i = 0; i < queries.size(); i++)
        out.push_back(invited.count(queries[i]) ? 1 : 0);
    return out;
}

int main() {
    int g;
    if (!(std::cin >> g)) return 0;
    std::vector<std::string> guests(g);
    for (int i = 0; i < g; i++) std::cin >> guests[i];
    int q;
    std::cin >> q;
    std::vector<std::string> queries(q);
    for (int i = 0; i < q; i++) std::cin >> queries[i];
    std::vector<int> res = guest_check(guests, queries);
    for (size_t i = 0; i < res.size(); i++) {
        if (i) std::cout << ' ';
        std::cout << res[i];
    }
    std::cout << std::endl;
    return 0;
}`,

  "Environment Lookup": `#include <iostream>
#include <vector>
#include <string>
#include <map>

int env_get(std::vector<std::string> names, std::vector<int> values, std::string target) {
    std::map<std::string, int> env;
    for (size_t i = 0; i < names.size(); i++) {
        if (values[i] == -1) env.erase(names[i]);
        else env[names[i]] = values[i];
    }
    if (env.count(target)) return env[target];
    return -1;
}

int main() {
    int m;
    if (!(std::cin >> m)) return 0;
    std::vector<std::string> names;
    std::vector<int> values;
    std::string target;
    for (int i = 0; i < m; i++) {
        std::string op, name;
        std::cin >> op >> name;
        if (op == "SET") {
            int value;
            std::cin >> value;
            names.push_back(name);
            values.push_back(value);
        } else if (op == "UNSET") {
            names.push_back(name);
            values.push_back(-1);
        } else {
            target = name;
        }
    }
    std::cout << env_get(names, values, target) << std::endl;
    return 0;
}`,

  "Count Pairs with Given Sum": `#include <iostream>
#include <vector>
#include <unordered_map>

int count_pairs(std::vector<int> v, int k) {
    std::unordered_map<long long, int> freq;
    long long pairs = 0;
    for (size_t i = 0; i < v.size(); i++) {
        long long need = (long long)k - v[i];
        if (freq.count(need)) pairs += freq[need];
        freq[(long long)v[i]]++;
    }
    return (int)pairs;
}

int main() {
    ${readN}
    int k;
    std::cin >> k;
    std::cout << count_pairs(v, k) << std::endl;
    return 0;
}`,

  "Environment Size After Ops": `#include <iostream>
#include <vector>
#include <string>
#include <map>

int env_size(std::vector<std::string> names, std::vector<int> values) {
    std::map<std::string, int> env;
    for (size_t i = 0; i < names.size(); i++) {
        if (values[i] == -1) env.erase(names[i]);
        else env[names[i]] = values[i];
    }
    return (int)env.size();
}

int main() {
    int m;
    if (!(std::cin >> m)) return 0;
    std::vector<std::string> names;
    std::vector<int> values;
    for (int i = 0; i < m; i++) {
        std::string op, name;
        std::cin >> op >> name;
        if (op == "SET") {
            int value;
            std::cin >> value;
            names.push_back(name);
            values.push_back(value);
        } else {
            names.push_back(name);
            values.push_back(-1);
        }
    }
    std::cout << env_size(names, values) << std::endl;
    return 0;
}`,

  "Environment Keys in Order": `#include <iostream>
#include <vector>
#include <string>
#include <map>

std::vector<std::string> env_keys(std::vector<std::string> names, std::vector<int> values) {
    std::map<std::string, int> env;
    for (size_t i = 0; i < names.size(); i++) {
        if (values[i] == -1) env.erase(names[i]);
        else env[names[i]] = values[i];
    }
    std::vector<std::string> keys;
    for (auto &kv : env) keys.push_back(kv.first);
    return keys;
}

int main() {
    int m;
    if (!(std::cin >> m)) return 0;
    std::vector<std::string> names;
    std::vector<int> values;
    for (int i = 0; i < m; i++) {
        std::string op, name;
        std::cin >> op >> name;
        if (op == "SET") {
            int value;
            std::cin >> value;
            names.push_back(name);
            values.push_back(value);
        } else {
            names.push_back(name);
            values.push_back(-1);
        }
    }
    std::vector<std::string> keys = env_keys(names, values);
    for (size_t i = 0; i < keys.size(); i++) {
        if (i) std::cout << ' ';
        std::cout << keys[i];
    }
    std::cout << std::endl;
    return 0;
}`,

  "First Character Without a Repeat": `#include <iostream>
#include <string>
#include <map>

char first_unique(std::string s) {
    std::map<char, int> freq;
    for (size_t i = 0; i < s.size(); i++) freq[s[i]]++;
    for (size_t i = 0; i < s.size(); i++)
        if (freq[s[i]] == 1) return s[i];
    return '-';
}

int main() {
    std::string s;
    std::cin >> s;
    std::cout << first_unique(s) << std::endl;
    return 0;
}`,

  "Values Appearing Exactly Once": `#include <iostream>
#include <vector>
#include <map>

int singleton_count(std::vector<int> v) {
    std::map<int, int> freq;
    for (size_t i = 0; i < v.size(); i++) freq[v[i]]++;
    int count = 0;
    for (auto &kv : freq)
        if (kv.second == 1) count++;
    return count;
}

int main() {
    ${readN}
    std::cout << singleton_count(v) << std::endl;
    return 0;
}`,

  "Registry Add Counter": `#include <iostream>
#include <vector>
#include <string>
#include <set>

int register_adds(std::vector<int> kinds, std::vector<std::string> names) {
    std::set<std::string> reg;
    int adds = 0;
    for (size_t i = 0; i < kinds.size(); i++) {
        if (kinds[i] == 1) {
            if (reg.insert(names[i]).second) adds++;
        } else {
            reg.erase(names[i]);
        }
    }
    return adds;
}

int main() {
    int m;
    if (!(std::cin >> m)) return 0;
    std::vector<int> kinds;
    std::vector<std::string> names;
    for (int i = 0; i < m; i++) {
        int kind;
        std::string name;
        std::cin >> kind >> name;
        kinds.push_back(kind);
        names.push_back(name);
    }
    std::cout << register_adds(kinds, names) << std::endl;
    return 0;
}`,

  "Two-Sum Index Pair": `#include <iostream>
#include <vector>
#include <unordered_map>

std::vector<int> two_sum_indices(std::vector<int> v, int k) {
    std::unordered_map<int, int> idx;
    for (int i = 0; i < (int)v.size(); i++) {
        int need = k - v[i];
        if (idx.count(need)) {
            std::vector<int> pair;
            pair.push_back(idx[need]);
            pair.push_back(i);
            return pair;
        }
        idx[v[i]] = i;
    }
    std::vector<int> none;
    none.push_back(-1);
    none.push_back(-1);
    return none;
}

int main() {
    ${readN}
    int k;
    std::cin >> k;
    std::vector<int> res = two_sum_indices(v, k);
    std::cout << res[0] << ' ' << res[1] << std::endl;
    return 0;
}`,

  "Union and Intersection Counts": `#include <iostream>
#include <vector>
#include <unordered_set>

std::vector<int> set_overlap(std::vector<int> a, std::vector<int> b) {
    std::unordered_set<int> sa;
    std::unordered_set<int> sb;
    for (size_t i = 0; i < a.size(); i++) sa.insert(a[i]);
    for (size_t i = 0; i < b.size(); i++) sb.insert(b[i]);
    int inter = 0;
    for (int x : sb)
        if (sa.count(x)) inter++;
    std::vector<int> out;
    out.push_back((int)(sa.size() + sb.size() - inter));
    out.push_back(inter);
    return out;
}

int main() {
    int n;
    if (!(std::cin >> n)) return 0;
    std::vector<int> a(n);
    for (int i = 0; i < n; i++) std::cin >> a[i];
    int m;
    std::cin >> m;
    std::vector<int> b(m);
    for (int i = 0; i < m; i++) std::cin >> b[i];
    std::vector<int> res = set_overlap(a, b);
    std::cout << res[0] << ' ' << res[1] << std::endl;
    return 0;
}`,

  "Count Anagram Groups": `#include <iostream>
#include <vector>
#include <string>
#include <map>

std::string anagram_signature(const std::string &w) {
    int cnt[26] = {0};
    for (size_t i = 0; i < w.size(); i++) cnt[w[i] - 'a']++;
    std::string sig;
    for (int i = 0; i < 26; i++) {
        sig += (char)('0' + cnt[i]);
        sig += '#';
    }
    return sig;
}

int anagram_group_count(std::vector<std::string> words) {
    std::map<std::string, int> groups;
    for (size_t i = 0; i < words.size(); i++) groups[anagram_signature(words[i])]++;
    return (int)groups.size();
}

int main() {
    int n;
    if (!(std::cin >> n)) return 0;
    std::vector<std::string> words(n);
    for (int i = 0; i < n; i++) std::cin >> words[i];
    std::cout << anagram_group_count(words) << std::endl;
    return 0;
}`,

  "Distinct Counts in Every Window": `#include <iostream>
#include <vector>
#include <unordered_map>

std::vector<int> window_distinct(std::vector<int> v, int k) {
    std::unordered_map<int, int> freq;
    std::vector<int> out;
    for (int i = 0; i < (int)v.size(); i++) {
        freq[v[i]]++;
        if (i >= k) {
            int left = v[i - k];
            freq[left]--;
            if (freq[left] == 0) freq.erase(left);
        }
        if (i >= k - 1) out.push_back((int)freq.size());
    }
    return out;
}

int main() {
    ${readN}
    int k;
    std::cin >> k;
    std::vector<int> res = window_distinct(v, k);
    for (size_t i = 0; i < res.size(); i++) {
        if (i) std::cout << ' ';
        std::cout << res[i];
    }
    std::cout << std::endl;
    return 0;
}`,
};

if (Object.keys(programs).length !== data.questions.length) {
  console.error(`program count ${Object.keys(programs).length} != questions ${data.questions.length}`);
  process.exit(1);
}

for (const q of data.questions) {
  if (!(q.title in programs)) {
    console.error("MISSING program for:", q.title);
    process.exit(1);
  }
  q.sourcecode = programs[q.title];
}

writeFileSync(DST, JSON.stringify(data, null, 2));
console.log(`day-13.code.json written: ${data.questions.length} programs`);
