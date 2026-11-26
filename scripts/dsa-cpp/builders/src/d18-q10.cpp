#include <bits/stdc++.h>
using namespace std;

long long sjf_wait(std::vector<int> bursts) {
    std::sort(bursts.begin(), bursts.end());
    long long total = 0, elapsed = 0;
    for (int b : bursts) {
        total += elapsed;
        elapsed += b;
    }
    return total;
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> bursts(n);
    for (int& x : bursts) cin >> x;
    cout << sjf_wait(bursts) << "\n";
    return 0;
}
